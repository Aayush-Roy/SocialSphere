// "use client";

// import { Tweet } from "@/src/gql/graphql";
// import React, { useState } from "react";
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


// export interface FeedCardProps {
//   data:Tweet
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
//   activeColor: string;   // tailwind text color class when active
//   hoverBg: string;       // tailwind bg class on hover
//   label: string;
// }

// function ActionBtn({ icon, activeIcon, count, activeColor, hoverBg, label }: ActionBtnProps) {
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

// export function FeedCard({data}: FeedCardProps) {
//   console.log("feed->",data);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <article
//       className="relative flex gap-3 px-4 py-3 border-b border-gray-800 cursor-pointer transition-colors duration-150 hover:bg-white/[0.025]"
//       onClick={() => {}} // navigate to tweet detail in real app
//     >
//       {/* ── Avatar ── */}
//       <div className="flex-shrink-0 mt-0.5">
//         <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#1d9bf0]/40 transition-all">
         
//            <img
//         src={data.author?.profileImageUrl}
//          referrerPolicy="no-referrer"
//         className="w-10 h-10 rounded-full"
//       />
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="flex-1 min-w-0">

//         {/* Header row */}
//         <div className="flex items-start justify-between gap-2">
//           <div className="flex items-center gap-1 flex-wrap min-w-0">
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
//               onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
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
//                   { icon: <RiUserFollowLine />, label: `Follow @${data.author?.firstName.toLowerCase()}` },
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
//             onClick={(e) => { e.stopPropagation(); setBookmarked((p) => !p); }}
//             className={`p-2 rounded-full transition-colors duration-150 hover:bg-[#1d9bf0]/10 ${
//               bookmarked ? "text-[#1d9bf0]" : "text-gray-500 hover:text-[#1d9bf0]"
//             }`}
//             aria-label="Bookmark"
//           >
//             {bookmarked ? <BsFillBookmarkFill className="text-lg" /> : <BsBookmark className="text-lg" />}
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
//     name: "Elon Musk",
//     handle: "elonmusk",
//     verified: true,
//     timeAgo: "2h",
//     content: "The thing I love most about X is the raw, unfiltered conversation.\n\nNowhere else on the internet can you have this.",
//     stats: { replies: 4200, retweets: 18300, likes: 142000, views: 9800000 },
//   },
//   {
//     name: "Sajid Raza",
//     handle: "sajid_dev",
//     verified: false,
//     timeAgo: "45m",
//     content: "Next.js 15 + Tailwind 4 combo is absolutely insane 🔥\n\nBuilding at 10x speed now. Ship karo sab. 🚀",
//     stats: { replies: 87, retweets: 340, likes: 2100, views: 48000 },
//   },
//   {
//     name: "Vercel",
//     handle: "vercel",
//     verified: true,
//     timeAgo: "5h",
//     content: "Ship it. ▲",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
//     stats: { replies: 620, retweets: 3100, likes: 21000, views: 510000 },
//   },
//   {
//     name: "Dev Rana",
//     handle: "devrana99",
//     verified: false,
//     timeAgo: "1h",
//     replyTo: "sajid_dev",
//     content: "Bhai sach bol raha hai, ek baar Tailwind 4 try karo life badal jaegi 😭",
//     stats: { replies: 12, retweets: 5, likes: 98, views: 3400 },
//   },
// ];

// export default function FeedCardDemo(props: FeedCardProps) {
//   // const {data} = props;
//   // console.log("data-->", props)
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
//         {data?.map((tweet, i) => (
//           <FeedCard key={i} {...tweet} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { Tweet } from "@/src/gql/graphql";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineRetweet,
  AiOutlineBarChart,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import Link from "next/link";

export interface FeedCardProps {
  data: Tweet;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 text-white font-bold text-sm select-none">
      {letters}
    </div>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────

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
      className={`group flex items-center gap-1.5 transition-colors duration-150 ${
        active ? activeColor : "text-gray-500"
      }`}
    >
      <span
        className={`p-2 rounded-full transition-colors duration-150 group-hover:${hoverBg} ${
          active ? `${hoverBg}` : ""
        }`}
      >
        {active && activeIcon ? activeIcon : icon}
      </span>
      {count !== undefined && (
        <span className="text-[13px] tabular-nums">{formatCount(displayCount)}</span>
      )}
    </button>
  );
}

// ─── Feed Card ────────────────────────────────────────────────────────────────

export function FeedCard({ data }: FeedCardProps) {
  console.log("feed->", data);
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigate to user profile
  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data?.author?.id) {
      router.push(`/profile/${data.author?.id}`);
    }
  };

  return (
    <article
      className="relative flex gap-3 px-4 py-3 border-b border-gray-800 cursor-pointer transition-colors duration-150 hover:bg-white/[0.025]"
      onClick={() => {}} // navigate to tweet detail in real app
    >
      {/* ── Avatar ── */}
      <Link href={`/profile/${data.author?.id}`}>
      <div
        className="flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-80 transition"
        onClick={handleProfileClick}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#1d9bf0]/40 transition-all">
          <img
            src={data.author?.profileImageUrl}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      </Link>
      {/* ── Body ── */}
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex items-center gap-1 flex-wrap min-w-0 cursor-pointer hover:opacity-80 transition"
            onClick={handleProfileClick}
          >
            <span className="text-white font-bold text-[15px] truncate hover:underline">
              {data.author?.firstName}
            </span>
            {/* {verified && (
              <MdOutlineVerified className="text-[#1d9bf0] text-base flex-shrink-0" />
            )} */}
            <span className="text-gray-500 text-[14px] truncate">
              @{data.author?.firstName.toLocaleLowerCase()}
            </span>
            <span className="text-gray-500 text-[14px]">·</span>
            {/* <span className="text-gray-500 text-[14px] flex-shrink-0">{timeAgo}</span> */}
          </div>

          {/* Three-dot menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
              className="p-1.5 rounded-full text-gray-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-all"
            >
              <BsThreeDots />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-8 z-50 bg-black border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 w-52 py-1 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  {
                    icon: <RiUserFollowLine />,
                    label: `Follow @${data.author?.firstName.toLowerCase()}`,
                  },
                  { icon: <BsBookmark />, label: "Add to Bookmarks" },
                  { icon: <AiOutlineShareAlt />, label: "Share post via…" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reply-to tag */}
        {/* {replyTo && (
          <p className="text-[13px] text-gray-500 mt-0.5 mb-1">
            Replying to{" "}
            <span className="text-[#1d9bf0] hover:underline cursor-pointer">
              @{replyTo}
            </span>
          </p>

        )} */}

        {/* Tweet text */}
        <p className="text-white text-[15px] leading-relaxed mt-0.5 whitespace-pre-wrap break-words">
          {data.content}
        </p>

        {/* Optional image */}
        {data.imageUrl && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700/60 max-h-80">
            <img
              src={data.imageUrl}
              alt="tweet media"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── Action Row ── */}
        <div className="flex items-center justify-between mt-3 max-w-md -ml-2">
          {/* Reply */}
          <ActionBtn
            icon={<AiOutlineComment className="text-lg" />}
            // count={stats?.replies}
            activeColor="text-[#1d9bf0]"
            hoverBg="bg-[#1d9bf0]/10"
            label="Reply"
          />

          {/* Retweet */}
          <ActionBtn
            icon={<AiOutlineRetweet className="text-lg" />}
            // count={stats?.retweets}
            activeColor="text-green-400"
            hoverBg="bg-green-400/10"
            label="Retweet"
          />

          {/* Like */}
          <ActionBtn
            icon={<AiOutlineHeart className="text-lg" />}
            activeIcon={<AiFillHeart className="text-lg" />}
            // count={stats?.likes}
            activeColor="text-pink-500"
            hoverBg="bg-pink-500/10"
            label="Like"
          />

          {/* Views */}
          <ActionBtn
            icon={<AiOutlineBarChart className="text-lg" />}
            // count={stats?.views}
            activeColor="text-[#1d9bf0]"
            hoverBg="bg-[#1d9bf0]/10"
            label="Views"
          />

          {/* Bookmark */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked((p) => !p);
            }}
            className={`p-2 rounded-full transition-colors duration-150 hover:bg-[#1d9bf0]/10 ${
              bookmarked ? "text-[#1d9bf0]" : "text-gray-500 hover:text-[#1d9bf0]"
            }`}
            aria-label="Bookmark"
          >
            {bookmarked ? (
              <BsFillBookmarkFill className="text-lg" />
            ) : (
              <BsBookmark className="text-lg" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full text-gray-500 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors duration-150"
            aria-label="Share"
          >
            <AiOutlineShareAlt className="text-lg" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Demo / Usage ─────────────────────────────────────────────────────────────

const DEMO_TWEETS: FeedCardProps[] = [
  {
    data: {
      id: "1",
      content:
        "The thing I love most about X is the raw, unfiltered conversation.\n\nNowhere else on the internet can you have this.",
      author: {
        id: "elon",
        firstName: "Elon Musk",
        profileImageUrl: "https://via.placeholder.com/48",
      },
      imageUrl: undefined,
      createdAt: new Date().toISOString(),
    } as Tweet,
  },
];

export default function FeedCardDemo(props: FeedCardProps) {
  return (
    <div className="min-h-screen bg-black ">
      <div className="max-w-[800px] mx-auto border-x border-gray-800 min-h-screen">
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-4 py-3 border-b border-gray-800 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.8)" }}
        >
          <h1 className="text-white font-bold text-xl">Home</h1>
        </div>

        {/* Cards */}
        {/* {data?.map((tweet, i) => (
          <FeedCard key={i} {...tweet} />
        ))} */}
      </div>
    </div>
  );
}