
// "use client";

// import { Tweet } from "@/src/gql/graphql";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineRetweet,
//   AiOutlineBarChart,
//   AiOutlineShareAlt,
//   AiOutlineComment,
// } from "react-icons/ai";
// import { BsBookmark, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
// import { MdOutlineVerified } from "react-icons/md";
// import { RiUserFollowLine } from "react-icons/ri";
// import Link from "next/link";

// export interface FeedCardProps {
//   data: Tweet;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function formatCount(n: number): string {
//   if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
//   if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
//   return String(n);
// }

// function Initials({ name }: { name: string }) {
//   const letters = name
//     .split(" ")
//     .map((w) => w[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();
//   return (
//     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 text-white font-bold text-sm select-none">
//       {letters}
//     </div>
//   );
// }

// // ─── Action Button ────────────────────────────────────────────────────────────

// interface ActionBtnProps {
//   icon: React.ReactNode;
//   activeIcon?: React.ReactNode;
//   count?: number;
//   activeColor: string;
//   hoverBg: string;
//   label: string;
// }

// function ActionBtn({
//   icon,
//   activeIcon,
//   count,
//   activeColor,
//   hoverBg,
//   label,
// }: ActionBtnProps) {
//   const [active, setActive] = useState(false);
//   const [displayCount, setDisplayCount] = useState(count ?? 0);

//   const toggle = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setActive((p) => {
//       setDisplayCount((c) => (p ? c - 1 : c + 1));
//       return !p;
//     });
//   };

//   return (
//     <button
//       onClick={toggle}
//       aria-label={label}
//       className={`group flex items-center gap-1.5 transition-colors duration-150 ${
//         active ? activeColor : "text-gray-500"
//       }`}
//     >
//       <span
//         className={`p-2 rounded-full transition-colors duration-150 group-hover:${hoverBg} ${
//           active ? `${hoverBg}` : ""
//         }`}
//       >
//         {active && activeIcon ? activeIcon : icon}
//       </span>
//       {count !== undefined && (
//         <span className="text-[13px] tabular-nums">{formatCount(displayCount)}</span>
//       )}
//     </button>
//   );
// }

// // ─── Feed Card ────────────────────────────────────────────────────────────────

// export function FeedCard({ data }: FeedCardProps) {
//   // console.log("feed->", data);
//   const router = useRouter();
//   const [bookmarked, setBookmarked] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Navigate to user profile
//   const handleProfileClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (data?.author?.id) {
//       router.push(`/profile/${data.author?.id}`);
//     }
//   };

//   return (
//     <article
//       className="relative flex gap-3 px-4 py-3 border-b border-gray-800 cursor-pointer transition-colors duration-150 hover:bg-white/[0.025]"
//       onClick={() => {}} // navigate to tweet detail in real app
//     >
//       {/* ── Avatar ── */}
//       <Link href={`/profile/${data.author?.id}`}>
//       <div
//         className="flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-80 transition"
//         onClick={handleProfileClick}
//       >
//         <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#1d9bf0]/40 transition-all">
//           <img
//             src={data.author?.profileImageUrl}
//             referrerPolicy="no-referrer"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//         </div>
//       </div>
//       </Link>
//       {/* ── Body ── */}
//       <div className="flex-1 min-w-0">
//         {/* Header row */}
//         <div className="flex items-start justify-between gap-2">
//           <div
//             className="flex items-center gap-1 flex-wrap min-w-0 cursor-pointer hover:opacity-80 transition"
//             onClick={handleProfileClick}
//           >
//             <span className="text-white font-bold text-[15px] truncate hover:underline">
//               {data.author?.firstName}
//             </span>
//             {/* {verified && (
//               <MdOutlineVerified className="text-[#1d9bf0] text-base flex-shrink-0" />
//             )} */}
//             <span className="text-gray-500 text-[14px] truncate">
//               @{data.author?.firstName.toLocaleLowerCase()}
//             </span>
//             <span className="text-gray-500 text-[14px]">·</span>
//             {/* <span className="text-gray-500 text-[14px] flex-shrink-0">{timeAgo}</span> */}
//           </div>

//           {/* Three-dot menu */}
//           <div className="relative flex-shrink-0">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setMenuOpen((p) => !p);
//               }}
//               className="p-1.5 rounded-full text-gray-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-all"
//             >
//               <BsThreeDots />
//             </button>

//             {menuOpen && (
//               <div
//                 className="absolute right-0 top-8 z-50 bg-black border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 w-52 py-1 overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {[
//                   {
//                     icon: <RiUserFollowLine />,
//                     label: `Follow @${data.author?.firstName.toLowerCase()}`,
//                   },
//                   { icon: <BsBookmark />, label: "Add to Bookmarks" },
//                   { icon: <AiOutlineShareAlt />, label: "Share post via…" },
//                 ].map((item) => (
//                   <button
//                     key={item.label}
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center gap-3 w-full px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors text-left"
//                   >
//                     <span className="text-base">{item.icon}</span>
//                     {item.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Reply-to tag */}
//         {/* {replyTo && (
//           <p className="text-[13px] text-gray-500 mt-0.5 mb-1">
//             Replying to{" "}
//             <span className="text-[#1d9bf0] hover:underline cursor-pointer">
//               @{replyTo}
//             </span>
//           </p>

//         )} */}

//         {/* Tweet text */}
//         <p className="text-white text-[15px] leading-relaxed mt-0.5 whitespace-pre-wrap break-words">
//           {data.content}
//         </p>

//         {/* Optional image */}
//         {data.imageUrl && (
//           <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700/60 max-h-80">
//             <img
//               src={data.imageUrl}
//               alt="tweet media"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {/* ── Action Row ── */}
//         <div className="flex items-center justify-between mt-3 max-w-md -ml-2">
//           {/* Reply */}
//           <ActionBtn
//             icon={<AiOutlineComment className="text-lg" />}
//             // count={stats?.replies}
//             activeColor="text-[#1d9bf0]"
//             hoverBg="bg-[#1d9bf0]/10"
//             label="Reply"
//           />

//           {/* Retweet */}
//           <ActionBtn
//             icon={<AiOutlineRetweet className="text-lg" />}
//             // count={stats?.retweets}
//             activeColor="text-green-400"
//             hoverBg="bg-green-400/10"
//             label="Retweet"
//           />

//           {/* Like */}
//           <ActionBtn
//             icon={<AiOutlineHeart className="text-lg" />}
//             activeIcon={<AiFillHeart className="text-lg" />}
//             // count={stats?.likes}
//             activeColor="text-pink-500"
//             hoverBg="bg-pink-500/10"
//             label="Like"
//           />

//           {/* Views */}
//           <ActionBtn
//             icon={<AiOutlineBarChart className="text-lg" />}
//             // count={stats?.views}
//             activeColor="text-[#1d9bf0]"
//             hoverBg="bg-[#1d9bf0]/10"
//             label="Views"
//           />

//           {/* Bookmark */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setBookmarked((p) => !p);
//             }}
//             className={`p-2 rounded-full transition-colors duration-150 hover:bg-[#1d9bf0]/10 ${
//               bookmarked ? "text-[#1d9bf0]" : "text-gray-500 hover:text-[#1d9bf0]"
//             }`}
//             aria-label="Bookmark"
//           >
//             {bookmarked ? (
//               <BsFillBookmarkFill className="text-lg" />
//             ) : (
//               <BsBookmark className="text-lg" />
//             )}
//           </button>

//           {/* Share */}
//           <button
//             onClick={(e) => e.stopPropagation()}
//             className="p-2 rounded-full text-gray-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors duration-150"
//             aria-label="Share"
//           >
//             <AiOutlineShareAlt className="text-lg" />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// // ─── Demo / Usage ─────────────────────────────────────────────────────────────

// const DEMO_TWEETS: FeedCardProps[] = [
//   {
//     data: {
//       id: "1",
//       content:
//         "The thing I love most about X is the raw, unfiltered conversation.\n\nNowhere else on the internet can you have this.",
//       author: {
//         id: "elon",
//         firstName: "Elon Musk",
//         profileImageUrl: "https://via.placeholder.com/48",
//       },
//       imageUrl: undefined,
//       createdAt: new Date().toISOString(),
//     } as Tweet,
//   },
// ];

// export default function FeedCardDemo(props: FeedCardProps) {
//   return (
//     <div className="min-h-screen bg-black ">
//       <div className="max-w-[800px] mx-auto border-x border-gray-800 min-h-screen">
//         {/* Header */}
//         <div
//           className="sticky top-0 z-10 px-4 py-3 border-b border-gray-800 backdrop-blur-md"
//           style={{ background: "rgba(0,0,0,0.8)" }}
//         >
//           <h1 className="text-white font-bold text-xl">Home</h1>
//         </div>

//         {/* Cards */}
//         {/* {data?.map((tweet, i) => (
//           <FeedCard key={i} {...tweet} />
//         ))} */}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { Tweet } from "@/src/gql/graphql";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineRetweet,
//   AiOutlineBarChart,
//   AiOutlineShareAlt,
//   AiOutlineComment,
//   AiOutlineMore,
// } from "react-icons/ai";
// import { BsBookmark, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
// import { MdOutlineVerified } from "react-icons/md";
// import { RiUserFollowLine } from "react-icons/ri";
// import Link from "next/link";

// export interface FeedCardProps {
//   data: Tweet;
// }

// // Helper: Format numbers
// function formatCount(n: number): string {
//   if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
//   if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
//   return String(n);
// }

// // Action Button Component
// interface ActionBtnProps {
//   icon: React.ReactNode;
//   activeIcon?: React.ReactNode;
//   count?: number;
//   activeColor: string;
//   hoverBg: string;
//   label: string;
// }

// function ActionBtn({
//   icon,
//   activeIcon,
//   count,
//   activeColor,
//   hoverBg,
//   label,
// }: ActionBtnProps) {
//   const [active, setActive] = useState(false);
//   const [displayCount, setDisplayCount] = useState(count ?? 0);

//   const toggle = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setActive((p) => {
//       setDisplayCount((c) => (p ? c - 1 : c + 1));
//       return !p;
//     });
//   };

//   return (
//     <button
//       onClick={toggle}
//       aria-label={label}
//       className={`group flex items-center gap-2 transition-all duration-150 text-xs sm:text-sm ${
//         active ? activeColor : "text-gray-500"
//       }`}
//     >
//       <span
//         className={`p-2 rounded-full transition-all duration-150 group-hover:${hoverBg} ${
//           active ? `${hoverBg}` : ""
//         }`}
//       >
//         {active && activeIcon ? activeIcon : icon}
//       </span>
//       {count !== undefined && (
//         <span className="text-xs sm:text-sm tabular-nums hidden sm:inline">{formatCount(displayCount)}</span>
//       )}
//     </button>
//   );
// }

// // Feed Card Component
// export function FeedCard({ data }: FeedCardProps) {
//   const router = useRouter();
//   const [bookmarked, setBookmarked] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleProfileClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (data?.author?.id) {
//       router.push(`/profile/${data.author?.id}`);
//     }
//   };

//   return (
//     <article
//       className="relative flex gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800/50 cursor-pointer transition-all duration-150 hover:bg-white/[0.03] group"
//     >
//       {/* Avatar */}
//       <Link href={`/profile/${data.author?.id}`}>
//         <div className="flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-80 transition">
//           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-blue-500/40 transition-all">
//             {data.author?.profileImageUrl ? (
//               <img
//                 src={data.author?.profileImageUrl}
//                 referrerPolicy="no-referrer"
//                 alt={data.author?.firstName}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
//                 {data.author?.firstName?.[0]}
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>

//       {/* Body */}
//       <div className="flex-1 min-w-0">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-2 mb-2">
//           <div
//             className="flex items-center gap-1 sm:gap-2 flex-wrap min-w-0 cursor-pointer hover:opacity-80 transition"
//             onClick={handleProfileClick}
//           >
//             <span className="text-white font-bold text-sm sm:text-base truncate hover:underline">
//               {data.author?.firstName}
//             </span>
//             <span className="text-gray-500 text-xs sm:text-sm truncate">
//               @{data.author?.firstName?.toLowerCase()}
//             </span>
//             <span className="text-gray-600 text-xs">·</span>
//             <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0">now</span>
//           </div>

//           {/* Three-dot menu */}
//           <div className="relative flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setMenuOpen((p) => !p);
//               }}
//               className="p-2 rounded-full text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
//             >
//               <BsThreeDots className="text-lg" />
//             </button>

//             {menuOpen && (
//               <div
//                 className="absolute right-0 top-8 z-50 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl shadow-2xl shadow-black/80 w-48 py-1 overflow-hidden backdrop-blur-sm"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {[
//                   {
//                     icon: <RiUserFollowLine />,
//                     label: `Follow @${data.author?.firstName?.toLowerCase()}`,
//                   },
//                   { icon: <BsBookmark />, label: "Add to Bookmarks" },
//                   { icon: <AiOutlineShareAlt />, label: "Share" },
//                 ].map((item) => (
//                   <button
//                     key={item.label}
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center gap-3 w-full px-4 py-2 sm:py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors text-left"
//                   >
//                     <span className="text-base">{item.icon}</span>
//                     {item.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tweet Content */}
//         <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
//           {data.content}
//         </p>

//         {/* Image */}
//         {data.imageUrl && (
//           <div className="mt-3 rounded-xl overflow-hidden border border-gray-700/50 max-h-80 group/image hover:opacity-90 transition">
//             <img
//               src={data.imageUrl}
//               alt="post media"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {/* Action Row */}
//         <div className="flex items-center justify-between mt-3 max-w-md -ml-2 text-gray-500">
//           {/* Reply */}
//           <ActionBtn
//             icon={<AiOutlineComment className="text-base sm:text-lg" />}
//             activeColor="text-blue-400"
//             hoverBg="bg-blue-400/10"
//             label="Reply"
//           />

//           {/* Retweet */}
//           <ActionBtn
//             icon={<AiOutlineRetweet className="text-base sm:text-lg" />}
//             activeColor="text-green-400"
//             hoverBg="bg-green-400/10"
//             label="Retweet"
//           />

//           {/* Like */}
//           <ActionBtn
//             icon={<AiOutlineHeart className="text-base sm:text-lg" />}
//             activeIcon={<AiFillHeart className="text-base sm:text-lg" />}
//             activeColor="text-pink-500"
//             hoverBg="bg-pink-500/10"
//             label="Like"
//           />

//           {/* Views */}
//           <ActionBtn
//             icon={<AiOutlineBarChart className="text-base sm:text-lg" />}
//             activeColor="text-blue-400"
//             hoverBg="bg-blue-400/10"
//             label="Views"
//           />

//           {/* Bookmark */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setBookmarked((p) => !p);
//             }}
//             className={`p-2 rounded-full transition-all duration-150 hover:bg-blue-400/10 ${
//               bookmarked ? "text-blue-400" : "text-gray-500 hover:text-blue-400"
//             }`}
//             aria-label="Bookmark"
//           >
//             {bookmarked ? (
//               <BsFillBookmarkFill className="text-base sm:text-lg" />
//             ) : (
//               <BsBookmark className="text-base sm:text-lg" />
//             )}
//           </button>

//           {/* Share */}
//           <button
//             onClick={(e) => e.stopPropagation()}
//             className="p-2 rounded-full text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-150"
//             aria-label="Share"
//           >
//             <AiOutlineShareAlt className="text-base sm:text-lg" />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function FeedCardDemo(props: FeedCardProps) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
//       <div className="max-w-2xl mx-auto border-x border-gray-800/50 min-h-screen">
//         {/* Header */}
//         <div className="sticky top-0 z-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800/50 backdrop-blur-xl bg-gray-950/80">
//           <h1 className="text-xl sm:text-2xl font-bold text-white">Feed</h1>
//           <p className="text-gray-500 text-xs sm:text-sm">Latest posts from your network</p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Tweet } from "@/src/gql/graphql";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineRetweet,
  AiOutlineBarChart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { RiUserFollowLine } from "react-icons/ri";
import Link from "next/link";

export interface FeedCardProps {
  data: Tweet;
}

// ─── Formatting Helper ────────────────────────────────────────────────────────
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ─── Action Button Component ──────────────────────────────────────────────────
interface ActionBtnProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  count?: number;
  activeColor: string;
  hoverBg: string;
  label: string;
}

function ActionBtn({
  icon,
  activeIcon,
  count,
  activeColor,
  hoverBg,
  label,
}: ActionBtnProps) {
  const [active, setActive] = useState(false);
  const [displayCount, setDisplayCount] = useState(count ?? 0);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive((p) => {
      setDisplayCount((c) => (p ? c - 1 : c + 1));
      return !p;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={`group flex items-center gap-1.5 transition-all duration-300 ${
        active ? activeColor : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      <span
        className={`p-2.5 rounded-xl transition-all duration-300 group-hover:${hoverBg} ${
          active ? `${hoverBg} scale-110` : ""
        }`}
      >
        {active && activeIcon ? activeIcon : icon}
      </span>
      {count !== undefined && (
        <span className="text-[12px] font-medium tabular-nums">
          {formatCount(displayCount)}
        </span>
      )}
    </button>
  );
}

// ─── Main Feed Card ───────────────────────────────────────────────────────────
export function FeedCard({ data }: FeedCardProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!data) return null;

  return (
    <article
      className="relative flex gap-4 px-4 py-5 md:px-6 md:py-6 border-b border-zinc-800/40 cursor-pointer transition-all duration-500 hover:bg-white/[0.02]"
      onClick={() => {}} 
    >
      {/* ── Avatar (Squircle Style) ── */}
      <div className="flex-shrink-0">
        <Link href={`/profile/${data.author?.id}`}>
          <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-transparent hover:ring-indigo-500/30 transition-all duration-300 shadow-lg">
            {data.author?.profileImageUrl ? (
              <img
                src={data.author.profileImageUrl}
                alt={data.author.firstName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                {data.author?.firstName[0]}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 min-w-0">
            <Link 
              href={`/profile/${data.author?.id}`}
              className="text-white font-bold text-[15px] truncate hover:text-indigo-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {data.author?.firstName} {data.author?.lastName || ""}
            </Link>
            <span className="text-zinc-500 text-[13px] truncate flex items-center gap-1">
              @{data.author?.firstName.toLowerCase()}
              <span className="hidden sm:inline">· 2h</span>
            </span>
          </div>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
              className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <BsThreeDots size={18} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-10 z-50 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl w-56 py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-zinc-200 text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  <RiUserFollowLine size={18} />
                  Follow @{data.author?.firstName.toLowerCase()}
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-zinc-200 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <AiOutlineShareAlt size={18} />
                  Share Post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-1">
          <p className="text-zinc-200 text-[15px] leading-relaxed whitespace-pre-wrap break-words font-medium">
            {data.content}
          </p>

          {data.imageUrl && (
            <div className="mt-4 rounded-3xl overflow-hidden border border-zinc-800/50 shadow-inner">
              <img
                src={data.imageUrl}
                alt="Post media"
                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          )}
        </div>

        {/* ── Action Row ── */}
        <div className="flex items-center justify-between mt-5 max-w-lg -ml-2">
          {/* Reply */}
          <ActionBtn
            icon={<AiOutlineComment size={20} />}
            count={12}
            activeColor="text-indigo-400"
            hoverBg="bg-indigo-500/10"
            label="Reply"
          />

          {/* Retweet */}
          <ActionBtn
            icon={<AiOutlineRetweet size={20} />}
            count={5}
            activeColor="text-emerald-400"
            hoverBg="bg-emerald-500/10"
            label="Retweet"
          />

          {/* Like */}
          <ActionBtn
            icon={<AiOutlineHeart size={20} />}
            activeIcon={<AiFillHeart size={20} />}
            count={142}
            activeColor="text-rose-500"
            hoverBg="bg-rose-500/10"
            label="Like"
          />

          {/* Views - Hidden on small mobile */}
          <div className="hidden xs:block">
            <ActionBtn
              icon={<AiOutlineBarChart size={20} />}
              count={2400}
              activeColor="text-indigo-400"
              hoverBg="bg-indigo-500/10"
              label="Views"
            />
          </div>

          <div className="flex items-center gap-1">
             {/* Bookmark */}
            <button
                onClick={(e) => {
                e.stopPropagation();
                setBookmarked((p) => !p);
                }}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                bookmarked ? "text-indigo-400 bg-indigo-500/10" : "text-zinc-500 hover:bg-zinc-800"
                }`}
            >
                {bookmarked ? <BsFillBookmarkFill size={18} /> : <BsBookmark size={18} />}
            </button>
            
            {/* Share */}
            <button
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
            >
                <AiOutlineShareAlt size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Demo Page for Testing
export default function FeedCardDemo() {
    return (
      <div className="min-h-screen bg-[#080808]">
        <div className="max-w-[600px] mx-auto border-x border-zinc-800/50 min-h-screen">
          <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/60 border-b border-zinc-800/50 px-6 py-4">
            <h1 className="text-white font-black text-xl tracking-tight">Pulse Feed</h1>
          </div>
          {/* Example Usage */}
          {/* <FeedCard data={someTweetData} /> */}
        </div>
      </div>
    );
}