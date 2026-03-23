// import Image from "next/image";
// import React from "react";


// interface SocialSidebarButton {
//   title:string;
//   icon:React.ReactNode
// }

// const SidebarMenuItems:SocialSidebarButton[]=[
//   {
//     title:"Home",
//     icon:
//   }
// ]

// export default function Home() {
//   return (
//    <div className="grid grid-cols-12 h-screen w-screen">
//     <div className="col-span-3 "></div>
//     <div className="col-span-6 border-r-2 border-r-slate-800 border-l-2 border-l-slate-800"></div>
//     <div className="col-span-3 "></div>
//    </div>
//   );
// }
'use client'
import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineMore,
} from "react-icons/ai";
import { BsBookmark, BsPeople, BsTwitterX } from "react-icons/bs";
import { RiQuillPenLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Image from "next/image";
import FeedCardDemo, { FeedCard } from "@/components/FeedCard/page";

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
          <span className="text-gray-500 text-sm truncate">@yourhandle</span>
        </div>

        {/* Three dots */}
        <SlOptions className="hidden xl:block text-white text-sm flex-shrink-0" />
      </div>
    </div>
  );
}

// Full page layout demo
export default function Home() {
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
       
        {/* Placeholder tweets */}
        <FeedCardDemo/>
      </div>

      {/* Right Panel */}
      <div className="col-span-3 px-4 py-4 hidden xl:block">
        {/* Search bar */}
        <div className="flex items-center gap-3 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-800">
          <AiOutlineSearch className="text-gray-500 text-lg" />
          <span className="text-gray-500 text-sm">Search</span>
        </div>
      </div>
    </div>
  );
}