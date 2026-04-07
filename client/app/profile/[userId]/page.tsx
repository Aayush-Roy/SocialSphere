


// 'use client'

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   AiOutlineArrowLeft,
//   AiOutlineUser,
//   AiOutlineCalendar,
//   AiOutlineLink,
//   AiOutlineEnvironment,
// } from "react-icons/ai";
// import { useCurrentUser, useGetUserById, useFollowUser, useUnfollowUser } from "@/hooks/user";
// import { useGetAllTweets } from "@/hooks/tweet";
// import { FeedCard } from "@/components/FeedCard/page";

// export default function ProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   // ✅ FIXED: Use correct destructuring
//   const { user: currentUser } = useCurrentUser();
//   const { user: profileUser, refetch: refetchProfileUser } = useGetUserById(userId); // ✅ Changed from data to user
//   console.log("pro", profileUser);
//   const { tweets = [] } = useGetAllTweets();

//   // ✅ Mutations
//   const { followUserAsync, isFollowing: followLoading } = useFollowUser();
//   const { unfollowUserAsync, isUnfollowing: unfollowLoading } = useUnfollowUser();

//   // ✅ Local state - sync with profileUser.isFollowing
//   // const [isFollowingUser, setIsFollowingUser] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Get user tweets
//   const userTweets = tweets.filter((tweet) => tweet?.author.id === userId);

//   // ✅ Combine data
//   const userProfile = profileUser || (userTweets[0]?.author ? {
//     ...userTweets[0].author,
//     bio: "Twitter Developer | React Enthusiast 🚀",
//     location: "Delhi, India",
//     website: "example.com",
//     joinedDate: "January 2024",
//   } : { id: userId, firstName: "User" });

//   // ✅ CRITICAL: Sync isFollowing state from backend query
//   // useEffect(() => {
//   //   if (profileUser?.isFollowing !== undefined) {
//   //     console.log("✅ Updated isFollowing from profileUser:", profileUser.isFollowing);
//   //     setIsFollowingUser(profileUser.isFollowing);
//   //     setError(null);
//   //   }
//   // }, [profileUser?.isFollowing]); // Only when isFollowing changes
//   const isFollowingUser = profileUser?.isFollowing ?? false;
//   console.log("isFollow", isFollowingUser)

//   // ✅ Check own profile
//   const isOwnProfile = currentUser?.id === userId;

//   // ✅ Handle follow with proper error handling
//   // const handleFollowClick = async () => {
//   //   if (!currentUser) {
//   //     setError("Please login first!");
//   //     return;
//   //   }

//   //   setError(null);
//   //   try {
//   //     if (isFollowingUser) {
//   //       // ✅ Optimistic update
//   //       setIsFollowingUser(false);
//   //       await unfollowUserAsync(userId);
//   //       // ✅ Refetch to ensure sync
//   //       await refetchProfileUser();
//   //     } else {
//   //       // ✅ Optimistic update
//   //       setIsFollowingUser(true);
//   //       await followUserAsync(userId);
//   //       // ✅ Refetch to ensure sync
//   //       await refetchProfileUser();
//   //     }
//   //   } catch (error) {
//   //     console.error("Error toggling follow:", error);
//   //     // ✅ Revert optimistic update on error
//   //     setIsFollowingUser(!isFollowingUser);
      
//   //     const errorMessage = error instanceof Error 
//   //       ? error.message 
//   //       : "Something went wrong! Please try again.";
//   //     setError(errorMessage);
//   //   }
//   // };
//   const handleFollowClick = async () => {
//   if (!currentUser) {
//     setError("Please login first!");
//     return;
//   }

//   setError(null);

//   try {
//     if (isFollowingUser) {
//       await unfollowUserAsync(userId);
//     } else {
//       await followUserAsync(userId);
//     }

//     await refetchProfileUser(); // sync UI with backend

//   } catch (error) {
//     console.error(error);
//     setError("Something went wrong!");
//   }
// };
//   const isLoading = followLoading || unfollowLoading;

//   return (
//     <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
//       <div className="max-w-[1300px] mx-auto grid grid-cols-12">
        
//         {/* Sidebar Space */}
//         <div className="col-span-1 sm:col-span-2 md:col-span-3 border-r border-gray-800" />

//         {/* Main Feed */}
//         <main className="col-span-11 sm:col-span-10 md:col-span-6 border-r border-gray-800 min-h-screen">
          
//           {/* Sticky Header */}
//           <div className="sticky top-0 z-20 backdrop-blur-md bg-black/70 px-4 py-1 flex items-center gap-6">
//             <button 
//               onClick={() => router.back()}
//               className="p-2 hover:bg-gray-900 rounded-full transition-all"
//             >
//               <AiOutlineArrowLeft className="text-xl" />
//             </button>
//             <div>
//               <h2 className="text-xl font-extrabold leading-tight">
//                 {userProfile.firstName} {userProfile.lastName || ""}
//               </h2>
//               <p className="text-[13px] text-gray-500">{userTweets.length} posts</p>
//             </div>
//           </div>

//           {/* Profile Section */}
//           <section className="relative">
//             {/* Banner */}
//             <div className="h-48 sm:h-52 bg-zinc-800 relative group cursor-pointer">
//               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
//             </div>

//             {/* Profile Detail Box */}
//             <div className="px-4 pb-4">
//               <div className="relative flex justify-between items-end -mt-16 mb-4">
//                 {/* Avatar */}
//                 <div className="w-32 h-32 rounded-full border-4 border-black bg-zinc-900 overflow-hidden relative flex-shrink-0">
//                   {userProfile.profileImageUrl ? (
//                     <Image 
//                       src={userProfile.profileImageUrl} 
//                       alt="avatar" 
//                       fill 
//                       className="object-cover" 
//                       sizes="128px"
//                       loading="eager"
//                       priority
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-zinc-800">
//                       <AiOutlineUser className="text-5xl text-gray-400" />
//                     </div>
//                   )}
//                 </div>

//                 {/* ✅ FOLLOW/UNFOLLOW OR EDIT BUTTON */}
//                 {isOwnProfile ? (
//                   <button className="px-4 py-1.5 border border-gray-600 rounded-full font-bold text-sm hover:bg-gray-900 transition-all">
//                     Edit profile
//                   </button>
//                 ) : (
//                   <div className="flex flex-col gap-2">
//                     <button 
//                       onClick={handleFollowClick}
//                       disabled={isLoading}
//                       className={`px-6 py-1.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
//                         isFollowingUser
//                           ? "border border-gray-600 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-500"
//                           : "bg-white text-black hover:bg-zinc-200"
//                       } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                     >
//                       {isLoading ? "Loading..." : isFollowingUser ? "Following" : "Follow"}
//                     </button>
                
//                     {error && (
//                       <p className="text-xs text-red-500 text-center">{error}</p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Identity */}
//               <div className="mt-4">
//                 <h1 className="text-xl font-extrabold leading-tight">
//                   {userProfile.firstName} {userProfile.lastName || ""}
//                 </h1>
//                 <p className="text-gray-500 text-sm">@{userProfile.firstName?.toLowerCase()}</p>
//               </div>

//               {/* Bio */}
//               <div className="mt-3 text-[15px] leading-normal text-gray-100">
//                 {userProfile.bio || "No bio added"}
//               </div>

//               {/* Metadata */}
//               <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-[14px]">
//                 {userProfile.location && (
//                   <span className="flex items-center gap-1">
//                     <AiOutlineEnvironment /> {userProfile.location}
//                   </span>
//                 )}
//                 {userProfile.website && (
//                   <a href="#" className="flex items-center gap-1 text-blue-400 hover:underline">
//                     <AiOutlineLink /> {userProfile.website}
//                   </a>
//                 )}
//                 <span className="flex items-center gap-1">
//                   <AiOutlineCalendar /> Joined {userProfile.joinedDate}
//                 </span>
//               </div>

//               {/* Stats */}
//               <div className="mt-3 flex gap-4 text-sm">
//                 <p className="hover:underline cursor-pointer">
//                   <span className="font-bold text-white">
//                     {profileUser?.following?.length || 0}
//                   </span> 
//                   <span className="text-gray-500"> Following</span>
//                 </p>
//                 <p className="hover:underline cursor-pointer">
//                   <span className="font-bold text-white">
//                     {profileUser?.followers?.length || 0}
//                   </span> 
//                   <span className="text-gray-500"> Followers</span>
//                 </p>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-800">
//               {["Posts", "Replies", "Highlights", "Media", "Likes"].map((tab, i) => (
//                 <button 
//                   key={tab} 
//                   className={`flex-1 py-4 text-sm font-semibold hover:bg-gray-900 transition relative ${
//                     i === 0 ? "text-white" : "text-gray-500"
//                   }`}
//                 >
//                   {tab}
//                   {i === 0 && (
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* Feed */}
//           <div className="pb-20">
//             {userTweets && userTweets.length > 0 ? (
//               userTweets.map((tweet) => (
//                 <FeedCard key={tweet?.id} data={tweet} />
//               ))
//             ) : (
//               <div className="flex items-center justify-center py-20 text-gray-500">
//                 No tweets yet
//               </div>
//             )}
//           </div>
//         </main>

//         {/* Right Panel */}
//         <div className="hidden md:block md:col-span-3 px-6 py-2">
//           <div className="bg-[#16181c] rounded-2xl p-4 sticky top-2">
//             <h2 className="text-xl font-extrabold mb-4">What's happening</h2>
//             <div className="space-y-4">
//               <div className="text-sm">
//                 <p className="text-gray-500 text-xs">Trending in India</p>
//                 <p className="font-bold">#NextJS2026</p>
//                 <p className="text-gray-500 text-xs">12.5K posts</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

  const { user: currentUser } = useCurrentUser();
  const { user: profileUser, refetch: refetchProfileUser } = useGetUserById(userId);
  const { tweets = [] } = useGetAllTweets();

  const { followUserAsync, isFollowing: followLoading } = useFollowUser();
  const { unfollowUserAsync, isUnfollowing: unfollowLoading } = useUnfollowUser();

  const [error, setError] = useState<string | null>(null);

  const userTweets = tweets.filter((tweet) => tweet?.author.id === userId);

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
    <div className="min-h-screen bg-[#080808] text-zinc-100 selection:bg-indigo-500/30">
      <div className="max-w-[1250px] mx-auto grid grid-cols-12 gap-0 md:gap-4">
        
        {/* Sidebar Space */}
        <div className="hidden sm:block sm:col-span-2 md:col-span-3" />

        {/* Main Feed */}
        <main className="col-span-12 sm:col-span-10 md:col-span-6 border-x border-zinc-800/50 bg-[#0c0c0c] min-h-screen">
          
          {/* Header: Modern Glass Effect */}
          <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/60 border-b border-zinc-800/50 px-5 py-3 flex items-center gap-8">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-zinc-800/50 rounded-xl transition-all border border-transparent hover:border-zinc-700"
            >
              <AiOutlineArrowLeft className="text-xl" />
            </button>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {userProfile.firstName} {userProfile.lastName || ""}
              </h2>
              <p className="text-[12px] text-zinc-500 font-medium uppercase tracking-wider">{userTweets.length} Posts</p>
            </div>
          </div>

          <section className="relative">
            {/* Banner: Curved & Gradient */}
            <div className="h-44 sm:h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
               <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
            </div>

            <div className="px-6">
              <div className="relative flex justify-between items-start -mt-14 mb-4">
                {/* Avatar: Modern Squircle Style */}
                <div className="w-32 h-32 rounded-3xl border-[6px] border-[#0c0c0c] bg-zinc-900 overflow-hidden shadow-2xl relative group">
                  {userProfile.profileImageUrl ? (
                    <Image 
                      src={userProfile.profileImageUrl} 
                      alt="avatar" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <AiOutlineUser className="text-5xl text-zinc-600" />
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-16">
                  {isOwnProfile ? (
                    <button className="px-5 py-2 border border-zinc-700 rounded-xl font-semibold text-sm hover:bg-zinc-800 transition-all active:scale-95">
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex flex-col items-end gap-2">
                      <button 
                        onClick={handleFollowClick}
                        disabled={isLoading}
                        className={`px-7 py-2 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
                          isFollowingUser
                            ? "bg-zinc-800 text-white hover:bg-red-950/30 hover:text-red-500 border border-zinc-700"
                            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {isLoading ? "..." : isFollowingUser ? "Following" : "Follow"}
                      </button>
                      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-white">
                  {userProfile.firstName} {userProfile.lastName || ""}
                </h1>
                <p className="text-indigo-400 font-medium text-sm">@{userProfile.firstName?.toLowerCase()}</p>
              </div>

              <div className="mt-4 text-[15px] text-zinc-300 leading-relaxed max-w-lg">
                {userProfile.bio || "Crafting digital experiences & exploring the future of web."}
              </div>

              {/* Metadata Grid */}
              <div className="mt-5 flex flex-wrap gap-y-2 gap-x-5 text-zinc-500 text-[13px] font-medium">
                {userProfile.location && (
                  <span className="flex items-center gap-1.5"><AiOutlineEnvironment className="text-indigo-500" /> {userProfile.location}</span>
                )}
                {userProfile.website && (
                  <a href="#" className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors">
                    <AiOutlineLink /> {userProfile.website}
                  </a>
                )}
                <span className="flex items-center gap-1.5"><AiOutlineCalendar /> Joined {userProfile.joinedDate}</span>
              </div>

              {/* Stats Bar */}
              <div className="mt-6 flex gap-6 pb-6 border-b border-zinc-800/50">
                <p className="hover:text-white transition-colors cursor-pointer group">
                  <span className="font-bold text-white">{profileUser?.following?.length || 0}</span> 
                  <span className="text-zinc-500 group-hover:text-zinc-400"> Following</span>
                </p>
                <p className="hover:text-white transition-colors cursor-pointer group">
                  <span className="font-bold text-white">{profileUser?.followers?.length || 0}</span> 
                  <span className="text-zinc-500 group-hover:text-zinc-400"> Followers</span>
                </p>
              </div>
            </div>

            {/* Tabs: Segmented Control Style */}
            <div className="flex px-2 pt-2 bg-[#0c0c0c] sticky top-[60px] z-20">
              {["Posts", "Replies", "Media", "Likes"].map((tab, i) => (
                <button 
                  key={tab} 
                  className={`flex-1 py-3 text-sm font-bold transition-all relative rounded-t-xl hover:bg-zinc-900/50 ${
                    i === 0 ? "text-indigo-400" : "text-zinc-500"
                  }`}
                >
                  {tab}
                  {i === 0 && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Feed: Subtle Separation */}
          <div className="pb-20 bg-zinc-900/10">
            {userTweets && userTweets.length > 0 ? (
              userTweets.map((tweet) => (
                <div key={tweet?.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors">
                  <FeedCard data={tweet} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-zinc-600">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                   <AiOutlineUser className="text-2xl" />
                </div>
                <p className="font-medium">No posts shared yet</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel: Sleek Cards */}
        <div className="hidden md:block md:col-span-3 px-4 py-4">
          <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-3xl p-5 sticky top-4">
            <h2 className="text-lg font-black mb-5 tracking-tight">Trends for you</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Trending in Tech</p>
                  <p className="font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors">#WebDev2025</p>
                  <p className="text-zinc-600 text-xs mt-0.5">42.1K interactions</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all">
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}