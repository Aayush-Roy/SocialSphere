
'use client'
import React, { useCallback, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineMore,
} from "react-icons/ai";
import { Gi3dGlasses } from "react-icons/gi";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { BsBookmark, BsTwitterX } from "react-icons/bs";
import { RiQuillPenLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { FeedCard } from "@/components/FeedCard/page";
import toast from "react-hot-toast";
import { graphqlClient } from "@/gqlClients/api";
import { verifyGoogleToken } from "@/graphql/query/user";
import { useCurrentUser, useGetSuggestedUsers } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostCard from "@/components/CreatePostCard";
import { useGetAllTweets } from "@/hooks/tweet";
import Link from "next/link";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  link: string;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { title: "Home", icon: <AiOutlineHome />, link: "/", active: true },
  { title: "Explore", icon: <AiOutlineSearch />, link: "/" },
  { title: "Notifications", icon: <AiOutlineBell />, link: "/" },
  { title: "Bookmarks", icon: <BsBookmark />, link: "/" },
  { title: "Profile", icon: <AiOutlineUser />, link: "/" },
];

// Skeleton Loader Component for Tweets
const TweetSkeleton = () => {
  return (
    <div className="border-b border-zinc-800/30 p-4 animate-pulse">
      <div className="flex gap-3">
        {/* Avatar Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-zinc-800/80 rounded"></div>
            <div className="h-3 w-16 bg-zinc-800/60 rounded"></div>
            <div className="h-1 w-1 bg-zinc-800 rounded-full"></div>
            <div className="h-3 w-20 bg-zinc-800/60 rounded"></div>
          </div>
          
          {/* Content lines */}
          <div className="space-y-2">
            <div className="h-4 bg-zinc-800/80 rounded w-full"></div>
            <div className="h-4 bg-zinc-800/80 rounded w-11/12"></div>
            <div className="h-4 bg-zinc-800/80 rounded w-9/12"></div>
          </div>
          
          {/* Image/Media Skeleton (optional) */}
          <div className="h-48 bg-zinc-800/60 rounded-xl w-full"></div>
          
          {/* Action Buttons Skeleton */}
          <div className="flex items-center justify-between mt-4 max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800/60"></div>
              <div className="h-3 w-8 bg-zinc-800/60 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800/60"></div>
              <div className="h-3 w-8 bg-zinc-800/60 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800/60"></div>
              <div className="h-3 w-8 bg-zinc-800/60 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800/60"></div>
              <div className="h-3 w-8 bg-zinc-800/60 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative: Shimmer Effect Skeleton
const TweetShimmerSkeleton = () => {
  return (
    <div className="border-b border-zinc-800/30 p-4 relative overflow-hidden">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80"></div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-zinc-800/80 rounded"></div>
            <div className="h-3 w-16 bg-zinc-800/60 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-800/80 rounded w-full"></div>
            <div className="h-4 bg-zinc-800/80 rounded w-10/12"></div>
            <div className="h-4 bg-zinc-800/80 rounded w-8/12"></div>
          </div>
          <div className="flex gap-6 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-zinc-800/60"></div>
            ))}
          </div>
        </div>
      </div>
      {/* Shimmer animation overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { tweets = [], isLoading: isLoadingTweets } = useGetAllTweets();
  const { users: suggestedUsers = [] } = useGetSuggestedUsers();
  const [showMobilePostModal, setShowMobilePostModal] = useState(false);
  const [showMobileLoginModal, setShowMobileLoginModal] = useState(false);

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error("Token error");
    const res = await graphqlClient.request(verifyGoogleToken, { token: googleToken });
    if (res.verifyGoogleToken) {
      localStorage.setItem("token", res.verifyGoogleToken);
      toast.success("Welcome back!");
      await queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      setShowMobileLoginModal(false);
    }
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100">
      {/* Add custom CSS for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Container - Grid Layout */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-12 min-h-screen relative">
        
        {/* 1. LEFT SIDEBAR - Responsive: Hidden on Mobile, Icons on Tablet, Full on Desktop */}
        <aside className="hidden sm:flex flex-col col-span-2 xl:col-span-3 border-r border-zinc-800/50 sticky top-0 h-screen px-2 xl:px-4 py-6 justify-between">
          <div className="flex flex-col items-center xl:items-start gap-2 w-full">
            <div className="p-3 mb-4 hover:bg-zinc-900 rounded-full transition-all cursor-pointer">
              <Gi3dGlasses className="text-white text-3xl" />
            </div>
            <nav className="flex flex-col gap-2 w-full">
              {sidebarItems.map((item) => (
                <Link key={item.title} href={item.title === "Profile" ? `/profile/${user?.id}` : item.link}>
                  <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${item.active ? "bg-indigo-500/10 text-indigo-400 font-bold" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="hidden xl:block text-[17px] tracking-tight">{item.title}</span>
                  </div>
                </Link>
              ))}
            </nav>
            <button className="mt-6 w-12 h-12 xl:w-full xl:h-auto xl:py-3.5 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
              <RiQuillPenLine className="xl:hidden" size={24} />
              <span className="hidden xl:block text-lg">Post</span>
            </button>
          </div>

          {user && (
            <Link href={`/profile/${user?.id}`} className="w-full">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all group">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <Image src={user.profileImageUrl || ""} alt="user" fill className="rounded-xl object-cover" />
                </div>
                <div className="hidden xl:flex flex-col min-w-0">
                  <span className="text-white font-bold text-sm truncate">{user.firstName}</span>
                  <span className="text-zinc-500 text-xs truncate">@{user.firstName?.toLowerCase()}</span>
                </div>
              </div>
            </Link>
          )}
        </aside>

        {/* 2. MAIN FEED - Responsive: Full width on mobile, adjusted on desktop */}
        <main className="col-span-12 sm:col-span-10 lg:col-span-7 xl:col-span-6 border-r border-zinc-800/50 bg-[#0c0c0c]/50 min-h-screen pb-20 sm:pb-0">
          
          {/* Top Header - Glass effect */}
          <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-zinc-800/50 px-5 py-3 flex items-center justify-between sm:justify-start">
            <div className="sm:hidden w-8 h-8 relative">
                {user?.profileImageUrl ? (
                    <Image src={user.profileImageUrl} alt="me" fill className="rounded-full border border-zinc-700" />
                ) : (
                    <button 
                      onClick={() => setShowMobileLoginModal(true)}
                      className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"
                    >
                      <AiOutlineUser className="text-white text-lg" />
                    </button>
                )}
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight">Home</h1>
            <div className="sm:hidden">
              <Gi3dGlasses className="text-indigo-500 text-xl" />
            </div>
          </div>

          {/* Create Post Area */}
          <div className="border-b border-zinc-800/50">
            {user && <CreatePostCard userAvatar={user?.profileImageUrl} userName={user?.firstName} />}
          </div>

          {/* Feed Content with Skeleton Loading */}
          <div className="flex flex-col">
            {/* Show loading skeletons while tweets are loading */}
            {isLoadingTweets ? (
              <>
                {/* Show 5 skeleton items while loading */}
                {[...Array(5)].map((_, index) => (
                  <TweetShimmerSkeleton key={`skeleton-${index}`} />
                ))}
              </>
            ) : tweets?.length > 0 ? (
              // Show actual tweets when loaded
              tweets?.map((tweet) => (
                <div key={tweet.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/10 transition-colors">
                  <FeedCard data={tweet} />
                </div>
              ))
            ) : (
              // Show empty state when no tweets
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">No posts yet</h3>
                <p className="text-zinc-500 text-sm">
                  When someone posts something, you'll see it here
                </p>
              </div>
            )}
          </div>
        </main>

        {/* 3. RIGHT PANEL - Responsive: Hidden on Mobile and Tablet, Visible only on Large Desktop */}
        <aside className="hidden lg:block lg:col-span-3 px-6 py-4 space-y-6 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/50 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
            <AiOutlineSearch className="text-zinc-500" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          {!user ? (
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 text-center">
              <h2 className="text-lg font-bold mb-4">New to SocialSphere?</h2>
              <GoogleLogin onSuccess={handleLoginWithGoogle} theme="filled_black" shape="pill" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Suggestions */}
              <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-3xl p-5">
                <h2 className="text-lg font-black mb-5 tracking-tight">Who to follow</h2>
                <div className="space-y-5">
                  {suggestedUsers?.slice(0, 4).map((sUser: any) => (
                    <div key={sUser.id} className="flex items-center justify-between gap-3">
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="w-10 h-10 relative flex-shrink-0">
                            <Image src={sUser.profileImageUrl || ""} alt="user" fill className="rounded-xl object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-bold truncate">{sUser.firstName}</p>
                          <p className="text-[11px] text-zinc-500 font-semibold uppercase">@{sUser.firstName.toLowerCase()}</p>
                        </div>
                      </div>
                      <Link href={`/profile/${sUser.id}`} className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-zinc-200 shrink-0">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-5">
                <h2 className="text-lg font-black mb-4 tracking-tight">Trending</h2>
                <div className="space-y-4">
                   <div className="group cursor-pointer">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Trending in Tech</p>
                    <p className="font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors">#NextJS15</p>
                    <p className="text-zinc-500 text-xs mt-0.5">18.4K posts</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* 4. MOBILE BOTTOM NAVIGATION - Visible only on screen < 640px */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-zinc-800/50 flex justify-around items-center py-3 px-4">
          {sidebarItems.map((item) => (
            <Link key={item.title} href={item.title === "Profile" ? `/profile/${user?.id}` : item.link} className={item.active ? "text-indigo-500" : "text-zinc-500"}>
              <span className="text-2xl">{item.icon}</span>
            </Link>
          ))}
          {/* Special Post Button for Mobile */}
          {user && (
            <button 
              onClick={() => setShowMobilePostModal(true)}
              className="bg-indigo-600 p-3 rounded-full shadow-lg -mt-12 border-4 border-[#080808] hover:bg-indigo-500 transition-all"
            >
              <RiQuillPenLine size={24} className="text-white" />
            </button>
          )}
        </nav>

        {/* MOBILE POST MODAL */}
        {showMobilePostModal && user && (
          <div className="sm:hidden fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm">
            <div className="h-full flex flex-col bg-[#0c0c0c]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
                <button 
                  onClick={() => setShowMobilePostModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <IoClose size={28} />
                </button>
                <h2 className="text-lg font-bold">Create Post</h2>
                <div className="w-7"></div>
              </div>
              
              {/* Post Creation Card */}
              <div className="flex-1 overflow-y-auto">
                <CreatePostCard userAvatar={user?.profileImageUrl} userName={user?.firstName} />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE LOGIN MODAL */}
        {showMobileLoginModal && !user && (
          <div className="sm:hidden fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0c0c0c] border border-zinc-800/50 rounded-3xl p-8 w-full max-w-sm relative">
              <button 
                onClick={() => setShowMobileLoginModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <IoClose size={24} />
              </button>
              
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Gi3dGlasses className="text-indigo-500 text-5xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to SocialSphere</h2>
                  <p className="text-zinc-500 text-sm">Sign in to continue</p>
                </div>
                <div className="flex justify-center">
                  <GoogleLogin onSuccess={handleLoginWithGoogle} theme="filled_black" shape="pill" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}