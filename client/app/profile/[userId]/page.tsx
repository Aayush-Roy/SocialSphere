/// app/profile/[userId]/page.tsx
'use client'

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLink,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { useCurrentUser } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet";
import { FeedCard } from "@/components/FeedCard/page";

// ... Interfaces wahi rahengi jo aapne di hain ...

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  console.log(userId)

  const { user } = useCurrentUser();
  console.log(user);
  const { tweets = [] } = useGetAllTweets();
  console.log("from profile->",tweets);

  const userTweets = tweets.filter((tweet) => tweet?.author.id === userId);
  console.log("user-tweets", userTweets)

  const userProfile = userTweets[0]?.author
    ? {
        ...userTweets[0].author,
        bio: "Twitter Developer | React Enthusiast 🚀",
        location: "Delhi, India",
        website: "example.com",
        joinedDate: "January 2024",
        followersCount: 1250,
        followingCount: 342,
      }
    : { id: userId, firstName: "User" };

//   const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="max-w-[1300px] mx-auto grid grid-cols-12">
        
        {/* Sidebar Space (Hisaab se adjust karein) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 border-r border-gray-800" />

        {/* Main Feed */}
        <main className="col-span-11 sm:col-span-10 md:col-span-6 border-r border-gray-800 min-h-screen">
          
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 backdrop-blur-md bg-black/70 px-4 py-1 flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-900 rounded-full transition-all"
            >
              <AiOutlineArrowLeft className="text-xl" />
            </button>
            <div>
              <h2 className="text-xl font-extrabold leading-tight">
                {userProfile.firstName} {userProfile.lastName || ""}
              </h2>
              <p className="text-[13px] text-gray-500">{userTweets.length} posts</p>
            </div>
          </div>

          {/* Profile Section */}
          <section className="relative">
            {/* Banner */}
            <div className="h-48 sm:h-52 bg-zinc-800 relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            </div>

            {/* Profile Detail Box */}
            <div className="px-4 pb-4">
              <div className="relative flex justify-between items-end -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-black bg-zinc-900 overflow-hidden relative">
                  {userProfile.profileImageUrl ? (
                    <Image src={userProfile.profileImageUrl} alt="avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <AiOutlineUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                </div>

                {/* {isOwnProfile ? (
                  <button className="px-4 py-1.5 border border-gray-600 rounded-full font-bold text-sm hover:bg-gray-900 transition-all">
                    Edit profile
                  </button>
                ) : (
                  <button className="px-4 py-1.5 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-all">
                    Follow
                  </button>
                )} */}
              </div>

              {/* Identity */}
              <div className="mt-4">
                <h1 className="text-xl font-extrabold leading-tight">
                  {userProfile.firstName} {userProfile.lastName || ""}
                </h1>
                <p className="text-gray-500 text-sm">@{userProfile.firstName?.toLowerCase()}</p>
              </div>

              {/* Bio */}
              <div className="mt-3 text-[15px] leading-normal">
                {userProfile.bio}
              </div>

              {/* Metadata (Location, Link, Joined) */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-[14px]">
                {userProfile.location && (
                  <span className="flex items-center gap-1">
                    <AiOutlineEnvironment /> {userProfile.location}
                  </span>
                )}
                {userProfile.website && (
                  <a href="#" className="flex items-center gap-1 text-blue-400 hover:underline">
                    <AiOutlineLink /> {userProfile.website}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <AiOutlineCalendar /> Joined {userProfile.joinedDate}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-3 flex gap-4 text-sm">
                <p className="hover:underline cursor-pointer"><span className="font-bold text-white">{userProfile.followingCount}</span> <span className="text-gray-500">Following</span></p>
                <p className="hover:underline cursor-pointer"><span className="font-bold text-white">{userProfile.followersCount}</span> <span className="text-gray-500">Followers</span></p>
              </div>
            </div>

            {/* Tabs (X Style) */}
            <div className="flex border-b border-gray-800">
              {["Posts", "Replies", "Highlights", "Media", "Likes"].map((tab, i) => (
                <button 
                  key={tab} 
                  className={`flex-1 py-4 text-sm font-semibold hover:bg-gray-900 transition relative ${i === 0 ? "text-white" : "text-gray-500"}`}
                >
                  {tab}
                  {i === 0 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />}
                </button>
              ))}
            </div>
          </section>

          {/* Feed */}
          <div className="pb-20">
            {userTweets.map((tweet) => (
            //   <div key={tweet.id} className="p-4 border-b border-gray-800 hover:bg-white/[0.03] cursor-pointer transition">
            //     <div className="flex gap-3">
            //       <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
            //         {tweet.author.profileImageUrl && <Image src={tweet.author.profileImageUrl} alt="pfp" width={40} height={40} />}
            //       </div>
            //       <div className="flex-1">
            //         <div className="flex gap-1 items-center">
            //           <span className="font-bold hover:underline text-[15px]">{tweet.author.firstName}</span>
            //           <span className="text-gray-500 text-sm">@{tweet.author.firstName.toLowerCase()} · 2h</span>
            //         </div>
            //         <p className="text-[15px] mt-1 leading-normal">{tweet.content}</p>
            //         {tweet.image && (
            //            <div className="mt-3 border border-gray-800 rounded-2xl overflow-hidden">
            //               <Image src={tweet.image} alt="content" width={600} height={400} className="w-full" />
            //            </div>
            //         )}
            //       </div>
            //     </div>
            //   </div>
            <FeedCard key={tweet?.id} data={tweet}/>
            ))}
          </div>
        </main>

        {/* Right Panel (Trends) */}
        <div className="hidden md:block md:col-span-3 px-6 py-2">
            <div className="bg-[#16181c] rounded-2xl p-4 sticky top-2">
                <h2 className="text-xl font-extrabold mb-4">What's happening</h2>
                <div className="space-y-4">
                    <div className="text-sm">
                        <p className="text-gray-500 text-xs">Trending in India</p>
                        <p className="font-bold">#NextJS2026</p>
                        <p className="text-gray-500 text-xs">12.5K posts</p>
                    </div>
                    {/* More trends... */}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}