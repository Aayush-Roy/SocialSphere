// 'use client'
// import React, { useCallback, useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineSearch,
//   AiOutlineBell,
//   AiOutlineMail,
//   AiOutlineUser,
//   AiOutlineMore,
// } from "react-icons/ai";
// import { GoogleLogin } from "@react-oauth/google";
// import { BsBookmark, BsPeople, BsTwitterX } from "react-icons/bs";
// import { RiQuillPenLine, RiMoneyDollarCircleLine } from "react-icons/ri";
// import { MdOutlineVerified } from "react-icons/md";
// import { SlOptions } from "react-icons/sl";
// import Image from "next/image";
// import FeedCardDemo, { FeedCard } from "@/components/FeedCard/page";
// import toast from "react-hot-toast";
// import { graphql } from "@/src/gql";
// import { GraphQLClient } from "graphql-request";
// import { graphqlClient } from "@/gqlClients/api";
// import {  verifyGoogleToken } from "@/graphql/query/user";

// import { useCurrentUser, useGetSuggestedUsers } from "@/hooks/user";
// import { useQueryClient } from "@tanstack/react-query";
// import CreatePostCard from "@/components/CreatePostCard";
// import { useGetAllTweets } from "@/hooks/tweet";
// import Link from "next/link";
// interface SidebarItem {
//   title: string;
//   icon: React.ReactNode;
//   active?: boolean;
//   badge?: number;
//   link?:string;
// }

// const sidebarItems: SidebarItem[] = [
//   { title: "Home", icon: <AiOutlineHome />, active: true },
//   { title: "Explore", icon: <AiOutlineSearch /> },
//   { title: "Notifications", icon: <AiOutlineBell />, badge: 3 },

//   { title: "Grok", icon: <RiQuillPenLine /> },
//   { title: "Bookmarks", icon: <BsBookmark /> },

//   { title: "Profile", icon: <AiOutlineUser />},
//   { title: "More", icon: <AiOutlineMore /> },
// ];

// function SidebarButton({ item }: { item: SidebarItem }) {
//   const [hovered, setHovered] = useState(false);


//   return (
//     <button
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`
//         group flex items-center gap-4 px-3 py-3 rounded-full w-fit xl:w-full
//         transition-all duration-200 cursor-pointer
//         ${item.active ? "font-bold" : "font-normal"}
//         ${hovered ? "bg-gray-800/60" : ""}
//       `}
//       style={{ background: hovered ? "rgba(231,233,234,0.1)" : "transparent" }}
//     >
//       {/* Icon */}
//       <span className="relative text-[1.65rem] text-white flex-shrink-0">
//         {item.icon}
//         {item.badge && (
//           <span className="absolute -top-1 -right-1 bg-[#1d9bf0] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//             {item.badge}
//           </span>
//         )}
//       </span>

//       {/* Label */}
//       <span
//         className="hidden xl:block text-white text-xl tracking-wide"
//         style={{ fontFamily: "'Chirp', sans-serif", fontWeight: item.active ? 700 : 400 }}
//       >
//         {item.title}
//       </span>
//     </button>
//   );
// }

// export function TwitterSidebar() {
//   const { user, isLoading } = useCurrentUser();
//   return (
//     <div
//       className="flex flex-col h-screen sticky top-0 items-center xl:items-start px-2 xl:px-4 py-2 justify-between"
//       style={{ width: "auto" }}
//     >
//       {/* Top Section */}
//       <div className="flex flex-col gap-1 w-full">
//         {/* X Logo */}
//         <button className="p-3 rounded-full hover:bg-gray-800/60 transition-all w-fit mb-1"
//           style={{ background: "transparent" }}
//           onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,233,234,0.1)")}
//           onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
//         >
//           <BsTwitterX className="text-white text-2xl" />
//         </button>

//         {/* Nav Items */}
//         <nav className="flex flex-col gap-0.5">
//           {sidebarItems.map((item) => (
//             <SidebarButton key={item.title} item={item} />
//           ))}
//         </nav>

//         {/* Post Button */}
//         <div className="mt-4 xl:w-full flex justify-center xl:justify-start">
//           {/* Mobile: icon only */}
//           <button
//             className="xl:hidden p-3 rounded-full flex items-center justify-center text-white text-2xl transition-all"
//             style={{ background: "#1d9bf0" }}
//             onMouseEnter={e => (e.currentTarget.style.background = "#1a8cd8")}
//             onMouseLeave={e => (e.currentTarget.style.background = "#1d9bf0")}
//           >
//             <RiQuillPenLine />
//           </button>

//           {/* Desktop: full button */}
//           <button
//             className="hidden xl:flex items-center justify-center w-full py-3 rounded-full text-white font-bold text-lg transition-all"
//             style={{
//               background: "#1d9bf0",
//               fontFamily: "'Chirp', sans-serif",
//             }}
//             onMouseEnter={e => (e.currentTarget.style.background = "#1a8cd8")}
//             onMouseLeave={e => (e.currentTarget.style.background = "#1d9bf0")}
//           >
//             Post
//           </button>
//         </div>
//       </div>

//       {/* Bottom: User Profile */}
//       <Link href={`/profile/${user?.id}`}>
//       <div
//         className="flex items-center gap-3 p-3 rounded-full cursor-pointer w-full transition-all"
//         style={{ background: "transparent" }}
//         onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,233,234,0.1)")}
//         onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
//       >
//         {/* Avatar */}
    
//         <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
//           <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
//             <AiOutlineUser className="text-white text-xl" />
//           </div>
//         </div>

//         {/* Name & Handle */}
       
//         <div className="hidden xl:flex flex-col flex-1 min-w-0">
//           <span className="text-white font-bold text-sm truncate" style={{ fontFamily: "'Chirp', sans-serif" }}>
//             Your Name
//           </span>
//           <span className="text-gray-500 text-sm truncate">@{user?.firstName}</span>
//         </div>

//         {/* Three dots */}
//         {/* <SlOptions className="hidden xl:block text-white text-sm flex-shrink-0" /> */}
//         {user && <Image
//   src={user?.
// profileImageUrl
// }
//   alt="user"
//   width={40}
//   height={40}
//   className="rounded-full"
// />}
        
//       </div>
//       </Link>
//     </div>
//   );
// }

// // Full page layout demo
// export default function Home() {
//   // const user = useCurrentUser();
//   const { user, isLoading } = useCurrentUser();
//   const queryClient = useQueryClient();
//   const {tweets=[]} = useGetAllTweets();
//   const { users: suggestedUsers = [] } = useGetSuggestedUsers();
//   // console.log("tweets->", tweets);
//   console.log("sugges->",suggestedUsers);

//   const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
//   const googleToken = cred.credential;

//   if (!googleToken) {
//     toast.error("Google token not found");
//     return;
//   }

//   const res = await graphqlClient.request(verifyGoogleToken, {
//     token: googleToken,
//   });

//   console.log("token from backend ->", res.verifyGoogleToken);


//     if (res.verifyGoogleToken) {
//     localStorage.setItem("token", res.verifyGoogleToken);

//     toast.success("Login successful");

//     // 👇 important
//     await queryClient.invalidateQueries({
//       queryKey: ["getCurrentUser"],
//     });
//   }
  
// }, [queryClient]);
      




//   return (
//     <div
//       className="grid grid-cols-12 h-screen w-screen"
//       style={{ background: "#000000", color: "white" }}
//     >
//       {/* Sidebar */}
//       <div className="col-span-3 xl:col-span-3 flex justify-end border-r border-gray-800">
//         <TwitterSidebar />
//       </div>

//       {/* Main Feed */}
//       <div className="col-span-6 border-r border-gray-800 h-screen overflow-y-auto">
//         {/* Header */}
//        {user && (
//           <CreatePostCard
//             userAvatar={user?.
// profileImageUrl
// }
//             userName={user?.firstName}
//             // onPostCreate={handleCreatePost}
//           />
//         )}
      
//         {tweets?.map((tweet)=>(
//     <FeedCard key={tweet.id} data={tweet}/>
//   ))}
//       </div>

//       {/* Right Panel */}
//       <div className="col-span-3 px-4 py-4 hidden xl:block">
//         {/* Search bar */}
//         <div className="flex items-center gap-3 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-800">
//           <AiOutlineSearch className="text-gray-500 text-lg" />
//           <span className="text-gray-500 text-sm">Search</span>
          
//         </div>
//         {!user && <GoogleLogin onSuccess={handleLoginWithGoogle}/>}
//            <div className="hidden md:block md:col-span-3 px-6 py-2">
//                     {!user ? (
//                       /* Show Login if not logged in */
//                      <div></div>
//                     ) : (
//                       /* ✅ SHOW SUGGESTED USERS IF LOGGED IN */
//                       <div className="space-y-4 sticky top-2">
//                         <div className="bg-[#16181c] rounded-2xl p-4">
//                           <h2 className="text-xl font-extrabold mb-4">Who to follow</h2>
//                           <div className="space-y-4">
//                             {suggestedUsers?.map((user: any) => (
//                               <div key={user.id} className="flex items-center justify-between gap-2">
//                                 <div className="flex gap-2 items-center">
//                                   {user.profileImageUrl && (
//                                     <Image
//                                       src={user.profileImageUrl}
//                                       alt="user-image"
//                                       className="rounded-full"
//                                       width={40}
//                                       height={40}
//                                     />
//                                   )}
//                                   <div className="flex flex-col">
//                                     <p className="text-sm font-bold truncate max-w-[100px]">
//                                       {user.firstName} {user.lastName}
//                                     </p>
//                                     <p className="text-xs text-gray-500">@{user.firstName.toLowerCase()}</p>
//                                   </div>
//                                 </div>
//                                 <Link 
//                                   href={`/profile/${user.id}`} 
//                                   className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-200"
//                                 >
//                                   View
//                                 </Link>
//                               </div>
//                             ))}
//                           </div>
//                           <button className="text-blue-500 text-sm mt-4 hover:underline">Show more</button>
//                         </div>
          
//                         {/* Trending Box */}
//                         <div className="bg-[#16181c] rounded-2xl p-4">
//                           <h2 className="text-xl font-extrabold mb-4">What's happening</h2>
//                           <div className="text-sm">
//                             <p className="text-gray-500 text-xs">Trending in India</p>
//                             <p className="font-bold">#NextJS2026</p>
//                             <p className="text-gray-500 text-xs">12.5K posts</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//       </div>
//     </div>
//   );
// }
// 'use client'
// import React, { useCallback, useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineSearch,
//   AiOutlineBell,
//   AiOutlineMail,
//   AiOutlineUser,
//   AiOutlineMore,
//   AiOutlineMenu,
//   AiOutlineClose,
//   AiOutlineArrowUp,
// } from "react-icons/ai";
// import { GoogleLogin } from "@react-oauth/google";
// import { BsBookmark, BsPeople, BsFire } from "react-icons/bs";
// import { RiQuillPenLine, RiMoneyDollarCircleLine, RiChat3Line } from "react-icons/ri";
// import { MdOutlineVerified, MdOutlineRssFeed } from "react-icons/md";
// import { SlOptions } from "react-icons/sl";
// import Image from "next/image";
// import FeedCardDemo, { FeedCard } from "@/components/FeedCard/page";
// import toast from "react-hot-toast";
// import { graphql } from "@/src/gql";
// import { GraphQLClient } from "graphql-request";
// import { graphqlClient } from "@/gqlClients/api";
// import {  verifyGoogleToken } from "@/graphql/query/user";

// import { useCurrentUser, useGetSuggestedUsers } from "@/hooks/user";
// import { useQueryClient } from "@tanstack/react-query";
// import CreatePostCard from "@/components/CreatePostCard";
// import { useGetAllTweets } from "@/hooks/tweet";
// import Link from "next/link";

// interface SidebarItem {
//   title: string;
//   icon: React.ReactNode;
//   active?: boolean;
//   badge?: number;
//   link?: string;
// }

// const sidebarItems: SidebarItem[] = [
//   { title: "Home", icon: <MdOutlineRssFeed className="text-xl" />, active: true },
//   { title: "Explore", icon: <AiOutlineSearch className="text-xl" /> },
//   { title: "Notifications", icon: <AiOutlineBell className="text-xl" />, badge: 3 },
//   { title: "Messages", icon: <RiChat3Line className="text-xl" /> },
//   { title: "Bookmarks", icon: <BsBookmark className="text-xl" /> },
//   { title: "Trending", icon: <BsFire className="text-xl" /> },
//   { title: "Profile", icon: <AiOutlineUser className="text-xl" /> },
// ];

// function SidebarButton({ item }: { item: SidebarItem }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <button
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`
//         group flex items-center gap-4 px-4 py-3 rounded-xl w-full
//         transition-all duration-200 cursor-pointer
//         ${item.active ? "font-semibold bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white" : "font-medium text-gray-400 hover:text-white"}
//         ${hovered && !item.active ? "bg-gray-900/40" : ""}
//       `}
//     >
//       <span className={`text-xl transition-transform duration-200 ${item.active ? "scale-110" : ""}`}>
//         {item.icon}
//       </span>
//       <span className="text-lg hidden lg:inline">{item.title}</span>
//       {item.badge && (
//         <span className="ml-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5">
//           {item.badge}
//         </span>
//       )}
//     </button>
//   );
// }

// export function SocialSphereSidebar() {
//   const { user, isLoading } = useCurrentUser();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="flex flex-col h-screen sticky top-0 items-center lg:items-start px-3 lg:px-6 py-4 justify-between bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-800/50">
//       {/* Top Section */}
//       <div className="flex flex-col gap-2 w-full">
//         {/* Logo */}
//         <button className="p-2.5 lg:mb-4 rounded-full hover:bg-gray-800/50 transition-all w-fit">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
//             SS
//           </div>
//         </button>

//         {/* Nav Items */}
//         <nav className="flex flex-col gap-1">
//           {sidebarItems.map((item) => (
//             <SidebarButton key={item.title} item={item} />
//           ))}
//         </nav>

//         {/* Post Button */}
//         <div className="mt-6 w-full flex justify-center lg:justify-start">
//           <button
//             className="w-full flex items-center justify-center lg:justify-start gap-3 py-3 lg:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
//           >
//             <RiQuillPenLine className="text-lg" />
//             <span className="hidden lg:inline">Create Post</span>
//           </button>
//         </div>
//       </div>

//       {/* Bottom: User Profile */}
//       <Link href={`/profile/${user?.id}`}>
//         <div className="flex items-center gap-3 p-3 lg:p-4 rounded-xl cursor-pointer w-full hover:bg-gray-800/30 transition-all lg:w-full">
//           {user?.profileImageUrl ? (
//             <Image
//               src={user.profileImageUrl}
//               alt="user"
//               width={40}
//               height={40}
//               className="rounded-full ring-2 ring-gray-700"
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
//               {user?.firstName?.[0]}
//             </div>
//           )}
//           <div className="hidden lg:flex flex-col flex-1 min-w-0">
//             <span className="text-white font-semibold text-sm truncate">
//               {user?.firstName}
//             </span>
//             <span className="text-gray-500 text-xs truncate">@{user?.firstName?.toLowerCase()}</span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default function Home() {
//   const { user, isLoading } = useCurrentUser();
//   const queryClient = useQueryClient();
//   const { tweets = [] } = useGetAllTweets();
//   const { users: suggestedUsers = [] } = useGetSuggestedUsers();

//   const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
//     const googleToken = cred.credential;

//     if (!googleToken) {
//       toast.error("Google token not found");
//       return;
//     }

//     const res = await graphqlClient.request(verifyGoogleToken, {
//       token: googleToken,
//     });

//     if (res.verifyGoogleToken) {
//       localStorage.setItem("token", res.verifyGoogleToken);
//       toast.success("Login successful");
//       await queryClient.invalidateQueries({
//         queryKey: ["getCurrentUser"],
//       });
//     }
//   }, [queryClient]);

//   return (
//     <div className="grid grid-cols-12 h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
//       {/* Sidebar */}
//       <div className="col-span-3 lg:col-span-3 hidden sm:flex border-r border-gray-800/50">
//         <SocialSphereSidebar />
//       </div>

//       {/* Main Feed */}
//       <div className="col-span-12 sm:col-span-9 lg:col-span-6 border-r border-gray-800/50 h-screen overflow-y-auto">
//         {/* Sticky Header */}
//         <div className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50 px-4 py-4">
//           <h1 className="text-2xl font-bold text-white">Feed</h1>
//           <p className="text-gray-400 text-sm">Discover what's new</p>
//         </div>

//         {/* Create Post Card */}
//         {user && (
//           <CreatePostCard
//             userAvatar={user?.profileImageUrl}
//             userName={user?.firstName}
//           />
//         )}

//         {/* Feed Cards */}
//         {tweets?.length > 0 ? (
//           tweets.map((tweet) => (
//             <FeedCard key={tweet.id} data={tweet} />
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <MdOutlineRssFeed className="text-5xl mb-4 opacity-20" />
//             <p className="text-lg">No posts yet</p>
//             <p className="text-sm">Be the first to share something amazing!</p>
//           </div>
//         )}
//       </div>

//       {/* Right Panel - Trending & Suggested Users */}
//       <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 px-6 py-4 overflow-y-auto">
//         {/* Search Bar */}
//         <div className="flex items-center gap-3 bg-gray-800/30 rounded-2xl px-4 py-3 border border-gray-700/50 hover:border-gray-600/50 transition-all">
//           <AiOutlineSearch className="text-gray-500 text-lg" />
//           <input
//             type="text"
//             placeholder="Search SocialSphere..."
//             className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm"
//           />
//         </div>

//         {/* Login Card */}
//         {!user && (
//           <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-6">
//             <h3 className="text-lg font-bold text-white mb-2">Join SocialSphere</h3>
//             <p className="text-sm text-gray-300 mb-4">Sign in to interact with the community</p>
//             <GoogleLogin onSuccess={handleLoginWithGoogle} />
//           </div>
//         )}

//         {user && (
//           <>
//             {/* Suggested Users */}
//             <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-5 sticky top-20">
//               <h2 className="text-lg font-bold text-white mb-4">Suggested Users</h2>
//               <div className="space-y-4">
//                 {suggestedUsers?.slice(0, 5).map((suggestedUser: any) => (
//                   <div key={suggestedUser.id} className="flex items-center justify-between gap-3">
//                     <div className="flex gap-3 items-center flex-1">
//                       {suggestedUser.profileImageUrl ? (
//                         <Image
//                           src={suggestedUser.profileImageUrl}
//                           alt="user"
//                           className="rounded-full ring-1 ring-gray-700"
//                           width={40}
//                           height={40}
//                         />
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
//                           {suggestedUser.firstName?.[0]}
//                         </div>
//                       )}
//                       <div className="flex flex-col min-w-0">
//                         <p className="text-sm font-semibold text-white truncate">
//                           {suggestedUser.firstName} {suggestedUser.lastName}
//                         </p>
//                         <p className="text-xs text-gray-500">@{suggestedUser.firstName?.toLowerCase()}</p>
//                       </div>
//                     </div>
//                     <Link
//                       href={`/profile/${suggestedUser.id}`}
//                       className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
//                     >
//                       View
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//               {suggestedUsers?.length > 5 && (
//                 <button className="text-blue-400 text-sm font-semibold mt-4 hover:text-blue-300 w-full text-left">
//                   Show more →
//                 </button>
//               )}
//             </div>

//             {/* Trending Box */}
//             <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-5 sticky top-96">
//               <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
//                 <BsFire className="text-orange-500" />
//                 Trending Now
//               </h2>
//               <div className="space-y-4">
//                 {[
//                   { hashtag: "#SocialSphere", posts: "45.2K", trend: "Rising" },
//                   { hashtag: "#WebDevelopment", posts: "32.1K", trend: "Trending" },
//                   { hashtag: "#ReactJS", posts: "28.9K", trend: "Hot" },
//                 ].map((trend) => (
//                   <button
//                     key={trend.hashtag}
//                     className="w-full text-left hover:bg-gray-800/30 p-3 rounded-lg transition-colors"
//                   >
//                     <p className="text-xs text-gray-500 font-semibold uppercase">{trend.trend}</p>
//                     <p className="text-sm font-bold text-white">{trend.hashtag}</p>
//                     <p className="text-xs text-gray-500">{trend.posts} posts</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client'
// import React, { useCallback, useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineSearch,
//   AiOutlineBell,
//   AiOutlineUser,
//   AiOutlineMore,
// } from "react-icons/ai";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { BsBookmark, BsTwitterX } from "react-icons/bs";
// import { RiQuillPenLine } from "react-icons/ri";
// import Image from "next/image";
// import { FeedCard } from "@/components/FeedCard/page";
// import toast from "react-hot-toast";
// import { graphqlClient } from "@/gqlClients/api";
// import { verifyGoogleToken } from "@/graphql/query/user";
// import { useCurrentUser, useGetSuggestedUsers } from "@/hooks/user";
// import { useQueryClient } from "@tanstack/react-query";
// import CreatePostCard from "@/components/CreatePostCard";
// import { useGetAllTweets } from "@/hooks/tweet";
// import Link from "next/link";

// interface SidebarItem {
//   title: string;
//   icon: React.ReactNode;
//   active?: boolean;
//   badge?: number;
// }

// const sidebarItems: SidebarItem[] = [
//   { title: "Home", icon: <AiOutlineHome />, active: true },
//   { title: "Explore", icon: <AiOutlineSearch /> },
//   { title: "Notifications", icon: <AiOutlineBell />, badge: 3 },
//   { title: "Grok", icon: <RiQuillPenLine /> },
//   { title: "Bookmarks", icon: <BsBookmark /> },
//   { title: "Profile", icon: <AiOutlineUser /> },
//   { title: "More", icon: <AiOutlineMore /> },
// ];

// function SidebarButton({ item }: { item: SidebarItem }) {
//   return (
//     <button
//       className={`
//         group flex items-center gap-4 px-4 py-3.5 rounded-2xl w-fit xl:w-full
//         transition-all duration-300 cursor-pointer border border-transparent
//         ${item.active ? "bg-indigo-500/10 text-indigo-400 font-bold border-indigo-500/20" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"}
//       `}
//     >
//       <span className="relative text-2xl flex-shrink-0">
//         {item.icon}
//         {item.badge && (
//           <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-black">
//             {item.badge}
//           </span>
//         )}
//       </span>
//       <span className="hidden xl:block text-[17px] tracking-tight">
//         {item.title}
//       </span>
//     </button>
//   );
// }

// export function TwitterSidebar() {
//   const { user } = useCurrentUser();
//   return (
//     <div className="flex flex-col h-screen sticky top-0 items-center xl:items-start px-4 py-6 justify-between">
//       <div className="flex flex-col gap-2 w-full">
//         {/* Logo */}
//         <div className="p-3 mb-4 w-fit">
//           <BsTwitterX className="text-white text-3xl hover:scale-110 transition-transform cursor-pointer" />
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-1.5">
//           {sidebarItems.map((item) => (
//             <SidebarButton key={item.title} item={item} />
//           ))}
//         </nav>

//         {/* Post Button */}
//         <div className="mt-6 xl:w-full">
//           <button className="xl:hidden p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
//             <RiQuillPenLine size={24} />
//           </button>
//           <button className="hidden xl:block w-full py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 active:scale-95 transition-all">
//             Post
//           </button>
//         </div>
//       </div>

//       {/* User Profile bottom */}
//       {user && (
//         <Link href={`/profile/${user?.id}`} className="w-full">
//           <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all group">
//             {user.profileImageUrl ? (
//               <Image src={user.profileImageUrl} alt="user" width={44} height={44} className="rounded-xl object-cover" />
//             ) : (
//               <div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center"><AiOutlineUser size={24} /></div>
//             )}
//             <div className="hidden xl:flex flex-col flex-1 min-w-0">
//               <span className="text-white font-bold text-sm truncate">{user.firstName}</span>
//               <span className="text-zinc-500 text-xs truncate">@{user.firstName?.toLowerCase()}</span>
//             </div>
//             <AiOutlineMore className="hidden xl:block text-zinc-500 group-hover:text-white" />
//           </div>
//         </Link>
//       )}
//     </div>
//   );
// }

// export default function Home() {
//   const { user } = useCurrentUser();
//   const queryClient = useQueryClient();
//   const { tweets = [] } = useGetAllTweets();
//   const { users: suggestedUsers = [] } = useGetSuggestedUsers();

//   const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
//     const googleToken = cred.credential;
//     if (!googleToken) return toast.error("Token error");

//     const res = await graphqlClient.request(verifyGoogleToken, { token: googleToken });
//     if (res.verifyGoogleToken) {
//       localStorage.setItem("token", res.verifyGoogleToken);
//       toast.success("Welcome back!");
//       await queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
//     }
//   }, [queryClient]);

//   return (
//     <div className="min-h-screen bg-[#080808] text-zinc-100">
//       <div className="max-w-[1300px] mx-auto grid grid-cols-12 min-h-screen">
        
//         {/* Left Sidebar */}
//         <div className="col-span-2 xl:col-span-3 border-r border-zinc-800/50">
//           <TwitterSidebar />
//         </div>

//         {/* Main Feed */}
//         <main className="col-span-10 md:col-span-6 border-r border-zinc-800/50 bg-[#0c0c0c]/50">
//           {/* Sticky Header */}
//           <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/60 border-b border-zinc-800/50 px-5 py-4">
//             <h1 className="text-xl font-black tracking-tight">Home</h1>
//           </div>

//           <div className="border-b border-zinc-800/50">
//             {user && <CreatePostCard userAvatar={user?.profileImageUrl} userName={user?.firstName} />}
//           </div>

//           <div className="pb-20">
//             {tweets?.map((tweet) => (
//               <div key={tweet.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/10 transition-colors">
//                 <FeedCard data={tweet} />
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Right Panel */}
//         <div className="hidden md:block md:col-span-3 px-6 py-4 space-y-6">
//           {/* Modern Search */}
//           <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/50 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all group">
//             <AiOutlineSearch className="text-zinc-500 group-focus-within:text-indigo-400" />
//             <input type="text" placeholder="Search Pulse" className="bg-transparent border-none outline-none text-sm w-full" />
//           </div>

//           {!user ? (
//             <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 text-center">
//               <h2 className="text-lg font-bold mb-4">Join Pulse</h2>
//               <GoogleLogin onSuccess={handleLoginWithGoogle} theme="filled_black" shape="pill" />
//             </div>
//           ) : (
//             <div className="space-y-6 sticky top-4">
//               {/* Who to Follow Card */}
//               <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-3xl p-5">
//                 <h2 className="text-lg font-black mb-5 tracking-tight">Who to follow</h2>
//                 <div className="space-y-5">
//                   {suggestedUsers?.map((sUser: any) => (
//                     <div key={sUser.id} className="flex items-center justify-between gap-3 group">
//                       <div className="flex gap-3 items-center">
//                         <Image src={sUser.profileImageUrl || ""} alt="user" className="rounded-xl" width={40} height={40} />
//                         <div className="flex flex-col min-w-0">
//                           <p className="text-sm font-bold truncate max-w-[80px]">{sUser.firstName}</p>
//                           <p className="text-[11px] text-zinc-500 uppercase font-semibold">@{sUser.firstName.toLowerCase()}</p>
//                         </div>
//                       </div>
//                       <Link 
//                         href={`/profile/${sUser.id}`} 
//                         className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-zinc-200 transition-colors"
//                       >
//                         View
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="text-indigo-400 text-xs font-bold mt-6 hover:text-indigo-300 transition-colors">Show more</button>
//               </div>

//               {/* Trending Card */}
//               <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-3xl p-5">
//                 <h2 className="text-lg font-black mb-4 tracking-tight">Trending Now</h2>
//                 <div className="space-y-4">
//                   <div className="group cursor-pointer">
//                     <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Technology · Trending</p>
//                     <p className="font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors">#NextJS15</p>
//                     <p className="text-zinc-500 text-xs mt-0.5">18.4K posts</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



'use client'
import React, { useCallback } from "react";
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

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { tweets = [] } = useGetAllTweets();
  const { users: suggestedUsers = [] } = useGetSuggestedUsers();

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error("Token error");
    const res = await graphqlClient.request(verifyGoogleToken, { token: googleToken });
    if (res.verifyGoogleToken) {
      localStorage.setItem("token", res.verifyGoogleToken);
      toast.success("Welcome back!");
      await queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    }
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100">
      {/* Container - Grid Layout */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-12 min-h-screen relative">
        
        {/* 1. LEFT SIDEBAR - Responsive: Hidden on Mobile, Icons on Tablet, Full on Desktop */}
        <aside className="hidden sm:flex flex-col col-span-2 xl:col-span-3 border-r border-zinc-800/50 sticky top-0 h-screen px-2 xl:px-4 py-6 justify-between">
          <div className="flex flex-col items-center xl:items-start gap-2 w-full">
            <div className="p-3 mb-4 hover:bg-zinc-900 rounded-full transition-all cursor-pointer">
              {/* <BsTwitterX className="text-white text-3xl" /> */}
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
                {user?.profileImageUrl && (
                    <Image src={user.profileImageUrl} alt="me" fill className="rounded-full border border-zinc-700" />
                )}
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight">Home</h1>
            <div className="sm:hidden">
              <BsTwitterX className="text-indigo-500 text-xl" />
            </div>
          </div>

          {/* Create Post Area */}
          <div className="border-b border-zinc-800/50">
            {user && <CreatePostCard userAvatar={user?.profileImageUrl} userName={user?.firstName} />}
          </div>

          {/* Feed Content */}
          <div className="flex flex-col">
            {tweets?.map((tweet) => (
              <div key={tweet.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/10 transition-colors">
                <FeedCard data={tweet} />
              </div>
            ))}
          </div>
        </main>

        {/* 3. RIGHT PANEL - Responsive: Hidden on Mobile and Tablet, Visible only on Large Desktop */}
        <aside className="hidden lg:block lg:col-span-3 px-6 py-4 space-y-6 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/50 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
            <AiOutlineSearch className="text-zinc-500" />
            <input type="text" placeholder="Search Pulse" className="bg-transparent border-none outline-none text-sm w-full" />
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
          <button className="bg-indigo-600 p-3 rounded-full shadow-lg -mt-12 border-4 border-[#080808]">
            <RiQuillPenLine size={24} className="text-white" />
          </button>
        </nav>

      </div>
    </div>
  );
}