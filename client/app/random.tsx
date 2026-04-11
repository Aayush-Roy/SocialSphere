"use client";

import React, { useState } from "react";
import { useParams, useRouter, Link } from "next/navigation"; // Added Link
import Image from "next/image";
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLink,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { useCurrentUser, useGetUserById, useFollowUser, useUnfollowUser } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet";
import { FeedCard } from "@/components/FeedCard/page";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  // ✅ Data Fetching
  const { user: currentUser } = useCurrentUser();
  const { user: profileUser, refetch: refetchProfileUser } = useGetUserById(userId);
  const { tweets = [] } = useGetAllTweets();

  // ✅ Mutations
  const { followUserAsync, isFollowing: followLoading } = useFollowUser();
  const { unfollowUserAsync, isUnfollowing: unfollowLoading } = useUnfollowUser();

  const [error, setError] = useState<string | null>(null);

  // Get user tweets
  const userTweets = tweets.filter((tweet) => tweet?.author.id === userId);

  // Combine data
  const userProfile = profileUser || (userTweets[0]?.author ? {
    ...userTweets[0].author,
    bio: "Twitter Developer | React Enthusiast 🚀",
    location: "Delhi, India",
    website: "example.com",
    joinedDate: "January 2024",
  } : { id: userId, firstName: "User" });

  const isFollowingUser = profileUser?.isFollowing ?? false;
  const isOwnProfile = currentUser?.id === userId;

  const handleFollowClick = async () => {
    if (!currentUser) {
      setError("Please login first!");
      return;
    }
    setError(null);
    try {
      if (isFollowingUser) {
        await unfollowUserAsync(userId);
      } else {
        await followUserAsync(userId);
      }
      await refetchProfileUser(); 
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    }
  };

  const isLoading = followLoading || unfollowLoading;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="max-w-[1300px] mx-auto grid grid-cols-12">
        
        {/* Sidebar Space */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 border-r border-gray-800" />

        {/* Main Feed */}
        <main className="col-span-11 sm:col-span-10 md:col-span-6 border-r border-gray-800 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-20 backdrop-blur-md bg-black/70 px-4 py-1 flex items-center gap-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-900 rounded-full transition-all">
              <AiOutlineArrowLeft className="text-xl" />
            </button>
            <div>
              <h2 className="text-xl font-extrabold leading-tight">
                {userProfile.firstName} {userProfile.lastName || ""}
              </h2>
              <p className="text-[13px] text-gray-500">{userTweets.length} posts</p>
            </div>
          </div>

          {/* Profile Details (Your existing code) */}
          <section className="relative">
             <div className="h-48 sm:h-52 bg-zinc-800 relative" />
             <div className="px-4 pb-4">
                <div className="relative flex justify-between items-end -mt-16 mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-black bg-zinc-900 overflow-hidden relative">
                    {userProfile.profileImageUrl && (
                      <Image src={userProfile.profileImageUrl} alt="avatar" fill className="object-cover" />
                    )}
                  </div>
                  {isOwnProfile ? (
                    <button className="px-4 py-1.5 border border-gray-600 rounded-full font-bold text-sm hover:bg-gray-900">
                      Edit profile
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleFollowClick}
                        disabled={isLoading}
                        className={`px-6 py-1.5 rounded-full font-bold text-sm transition-all ${
                          isFollowingUser ? "border border-gray-600" : "bg-white text-black"
                        }`}
                      >
                        {isLoading ? "..." : isFollowingUser ? "Following" : "Follow"}
                      </button>
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-extrabold">{userProfile.firstName}</h1>
                <p className="text-gray-500">@{userProfile.firstName?.toLowerCase()}</p>
             </div>
          </section>

          {/* Tweets Feed */}
          <div className="pb-20">
            {userTweets.map((tweet) => <FeedCard key={tweet?.id} data={tweet} />)}
          </div>
        </main>

        {/* Right Panel - WHERE THE SUGGESTIONS GO */}
        <div className="hidden md:block md:col-span-3 px-6 py-2">
          {!currentUser ? (
            /* Show Login if not logged in */
            <div className="bg-[#16181c] rounded-2xl p-4">
              <h2 className="text-xl font-extrabold mb-2">New to Twitter?</h2>
              <p className="text-gray-500 text-sm mb-4">Sign up now to get your own personalized timeline!</p>
              <button className="w-full bg-white text-black font-bold py-2 rounded-full">
                Sign up with Google
              </button>
            </div>
          ) : (
            /* ✅ SHOW SUGGESTED USERS IF LOGGED IN */
            <div className="space-y-4 sticky top-2">
              <div className="bg-[#16181c] rounded-2xl p-4">
                <h2 className="text-xl font-extrabold mb-4">Who to follow</h2>
                <div className="space-y-4">
                  {currentUser?.suggestedUsers?.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between gap-2">
                      <div className="flex gap-2 items-center">
                        {user.profileImageUrl && (
                          <Image
                            src={user.profileImageUrl}
                            alt="user-image"
                            className="rounded-full"
                            width={40}
                            height={40}
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm font-bold truncate max-w-[100px]">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">@{user.firstName.toLowerCase()}</p>
                        </div>
                      </div>
                      <Link 
                        href={`/${user.id}`} 
                        className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-200"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
                <button className="text-blue-500 text-sm mt-4 hover:underline">Show more</button>
              </div>

              {/* Trending Box */}
              <div className="bg-[#16181c] rounded-2xl p-4">
                <h2 className="text-xl font-extrabold mb-4">What's happening</h2>
                <div className="text-sm">
                  <p className="text-gray-500 text-xs">Trending in India</p>
                  <p className="font-bold">#NextJS2026</p>
                  <p className="text-gray-500 text-xs">12.5K posts</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}