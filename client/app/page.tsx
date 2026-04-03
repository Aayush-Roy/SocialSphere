'use client'
import React, { useCallback, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineMore,
} from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import { BsBookmark, BsPeople, BsTwitterX } from "react-icons/bs";
import { RiQuillPenLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Image from "next/image";
import FeedCardDemo, { FeedCard } from "@/components/FeedCard/page";
import toast from "react-hot-toast";
import { graphql } from "@/src/gql";
import { GraphQLClient } from "graphql-request";
import { graphqlClient } from "@/gqlClients/api";
import {  verifyGoogleToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import CreatePostCard from "@/components/CreatePostCard";
import { useGetAllTweets } from "@/hooks/tweet";
interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { title: "Home", icon: <AiOutlineHome />, active: true },
  { title: "Explore", icon: <AiOutlineSearch /> },
  { title: "Notifications", icon: <AiOutlineBell />, badge: 3 },
  // { title: "Messages", icon: <AiOutlineMail /> },
  { title: "Grok", icon: <RiQuillPenLine /> },
  { title: "Bookmarks", icon: <BsBookmark /> },
  // { title: "Communities", icon: <BsPeople /> },
  // { title: "Premium", icon: <MdOutlineVerified /> },
  // { title: "Monetization", icon: <RiMoneyDollarCircleLine /> },
  { title: "Profile", icon: <AiOutlineUser /> },
  { title: "More", icon: <AiOutlineMore /> },
];

function SidebarButton({ item }: { item: SidebarItem }) {
  const [hovered, setHovered] = useState(false);


  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group flex items-center gap-4 px-3 py-3 rounded-full w-fit xl:w-full
        transition-all duration-200 cursor-pointer
        ${item.active ? "font-bold" : "font-normal"}
        ${hovered ? "bg-gray-800/60" : ""}
      `}
      style={{ background: hovered ? "rgba(231,233,234,0.1)" : "transparent" }}
    >
      {/* Icon */}
      <span className="relative text-[1.65rem] text-white flex-shrink-0">
        {item.icon}
        {item.badge && (
          <span className="absolute -top-1 -right-1 bg-[#1d9bf0] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </span>

      {/* Label */}
      <span
        className="hidden xl:block text-white text-xl tracking-wide"
        style={{ fontFamily: "'Chirp', sans-serif", fontWeight: item.active ? 700 : 400 }}
      >
        {item.title}
      </span>
    </button>
  );
}

export function TwitterSidebar() {
  const { user, isLoading } = useCurrentUser();
  return (
    <div
      className="flex flex-col h-screen sticky top-0 items-center xl:items-start px-2 xl:px-4 py-2 justify-between"
      style={{ width: "auto" }}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-1 w-full">
        {/* X Logo */}
        <button className="p-3 rounded-full hover:bg-gray-800/60 transition-all w-fit mb-1"
          style={{ background: "transparent" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,233,234,0.1)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <BsTwitterX className="text-white text-2xl" />
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col gap-0.5">
          {sidebarItems.map((item) => (
            <SidebarButton key={item.title} item={item} />
          ))}
        </nav>

        {/* Post Button */}
        <div className="mt-4 xl:w-full flex justify-center xl:justify-start">
          {/* Mobile: icon only */}
          <button
            className="xl:hidden p-3 rounded-full flex items-center justify-center text-white text-2xl transition-all"
            style={{ background: "#1d9bf0" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1a8cd8")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1d9bf0")}
          >
            <RiQuillPenLine />
          </button>

          {/* Desktop: full button */}
          <button
            className="hidden xl:flex items-center justify-center w-full py-3 rounded-full text-white font-bold text-lg transition-all"
            style={{
              background: "#1d9bf0",
              fontFamily: "'Chirp', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1a8cd8")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1d9bf0")}
          >
            Post
          </button>
        </div>
      </div>

      {/* Bottom: User Profile */}
      <div
        className="flex items-center gap-3 p-3 rounded-full cursor-pointer w-full transition-all"
        style={{ background: "transparent" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,233,234,0.1)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Avatar */}
    
        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <AiOutlineUser className="text-white text-xl" />
          </div>
        </div>

        {/* Name & Handle */}
       
        <div className="hidden xl:flex flex-col flex-1 min-w-0">
          <span className="text-white font-bold text-sm truncate" style={{ fontFamily: "'Chirp', sans-serif" }}>
            Your Name
          </span>
          <span className="text-gray-500 text-sm truncate">@{user?.firstName}</span>
        </div>

        {/* Three dots */}
        {/* <SlOptions className="hidden xl:block text-white text-sm flex-shrink-0" /> */}
        {user && <Image
  src={user?.
profileImageUrl
}
  alt="user"
  width={40}
  height={40}
  className="rounded-full"
/>}
        
      </div>
    </div>
  );
}

// Full page layout demo
export default function Home() {
  // const user = useCurrentUser();
  const { user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const {tweets=[]} = useGetAllTweets();
  console.log("tweets->", tweets);
  console.log("currUser->",user);
  // const handleLoginWithGoogle = useCallback(async(cred:CredentialResponse)=>{
  //   const googleToken = cred.credential
  //   if(!googleToken) return toast.error(`Google token not found`)
  //   const res = await graphqClient.request(verifyGoogleToken ,{token:googleToken})
  //   toast.success(`Verified Successful`)
  //   console.log(res)
  //   if(verifyGoogleToken) window.localStorage.setItem('token',res.verifyGoogleToken);
  // },[])
  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
  const googleToken = cred.credential;

  if (!googleToken) {
    toast.error("Google token not found");
    return;
  }

  const res = await graphqlClient.request(verifyGoogleToken, {
    token: googleToken,
  });

  console.log("token from backend ->", res.verifyGoogleToken);

  // if (res.verifyGoogleToken) {
  //   window.localStorage.setItem("token", res.verifyGoogleToken);
  //   toast.success("Login successful");

  //   // optional refresh so hook runs again
  //   window.location.reload();
    
  // }
    if (res.verifyGoogleToken) {
    localStorage.setItem("token", res.verifyGoogleToken);

    toast.success("Login successful");

    // 👇 important
    await queryClient.invalidateQueries({
      queryKey: ["getCurrentUser"],
    });
  }
  
}, [queryClient]);
      



// const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
//   const googleToken = cred.credential;

//   if (!googleToken) {
//     toast.error("Google token not found");
//     return;
//   }

//   const res = await graphqClient.request(verifyGoogleToken, {
//     token: googleToken,
//   });

//   if (res.verifyGoogleToken) {
//     localStorage.setItem("token", res.verifyGoogleToken);
//       console.log("token ->", localStorage.getItem("token"));
//     toast.success("Login successful");
//     // refetch current user
//     queryClient.invalidateQueries({
//       queryKey: ["current-user"],
//     });
//   }
// }, [queryClient]);
  return (
    <div
      className="grid grid-cols-12 h-screen w-screen"
      style={{ background: "#000000", color: "white" }}
    >
      {/* Sidebar */}
      <div className="col-span-3 xl:col-span-3 flex justify-end border-r border-gray-800">
        <TwitterSidebar />
      </div>

      {/* Main Feed */}
      <div className="col-span-6 border-r border-gray-800 h-screen overflow-y-auto">
        {/* Header */}
       {user && (
          <CreatePostCard
            userAvatar={user?.
profileImageUrl
}
            userName={user?.firstName}
            // onPostCreate={handleCreatePost}
          />
        )}
        {/* Placeholder tweets */}
        {/* {tweets?.map(tweet=><FeedCardDemo key={tweet?.id} data={tweet} />)} */}
        {/* <FeedCardDemo data={tweets} /> */}
        {tweets?.map((tweet)=>(
    <FeedCard key={tweet.id} data={tweet}/>
  ))}
      </div>

      {/* Right Panel */}
      <div className="col-span-3 px-4 py-4 hidden xl:block">
        {/* Search bar */}
        <div className="flex items-center gap-3 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-800">
          <AiOutlineSearch className="text-gray-500 text-lg" />
          <span className="text-gray-500 text-sm">Search</span>
          {!user && <GoogleLogin onSuccess={handleLoginWithGoogle}/>}
          
        </div>
      </div>
    </div>
  );
}