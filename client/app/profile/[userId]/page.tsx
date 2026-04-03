// app/profile/[userId]/page.tsx
'use client'

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLink,
  AiOutlineMore,
} from "react-icons/ai";
import { useCurrentUser } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet";

interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate?: string;
  followersCount?: number;
  followingCount?: number;
}

interface Tweet {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName?: string;
    profileImageUrl?: string;
  };
  likes?: number;
  comments?: number;
  retweets?: number;
  image?: string;
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  // Fetch current user (for demo, you'll need to fetch specific user)
  const { user: currentUser } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();

  // Filter tweets by this user
  const userTweets = tweets.filter((tweet) => tweet.author.id === userId);

  // For demo, create user profile from first tweet's author
  // In production, fetch from your API
  const userProfile: UserProfile = userTweets[0]?.author
    ? {
        id: userTweets[0].author.id,
        firstName: userTweets[0].author.firstName,
        lastName: userTweets[0].author.lastName,
        profileImageUrl: userTweets[0].author.profileImageUrl,
        bio: "Twitter Developer | React Enthusiast",
        location: "Delhi, India",
        website: "https://example.com",
        joinedDate: "January 2024",
        followersCount: 1250,
        followingCount: 342,
      }
    : {
        id: userId,
        firstName: "User",
        profileImageUrl: undefined,
      };

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div
      className="grid grid-cols-12 h-screen w-screen"
      style={{ background: "#000000", color: "white" }}
    >
      {/* Sidebar */}
      <div className="col-span-3 xl:col-span-3 flex justify-end border-r border-gray-800">
        {/* Minimal sidebar for profile page */}
      </div>

      {/* Main Content */}
      <div className="col-span-6 border-r border-gray-800 h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 backdrop-blur bg-black/80 border-b border-gray-700 p-4 z-10 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-900 transition"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h2>
            <p className="text-gray-500 text-sm">{userTweets.length} posts</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="border-b border-gray-700">
          {/* Cover Photo */}
          <div className="h-52 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            {/* Optional: Add cover image here */}
          </div>

          {/* Profile Info */}
          <div className="px-4 pb-4">
            {/* Avatar */}
            <div className="flex justify-between items-start -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-black overflow-hidden">
                {userProfile.profileImageUrl ? (
                  <Image
                    src={userProfile.profileImageUrl}
                    alt={userProfile.firstName}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    <AiOutlineUser className="text-white text-5xl" />
                  </div>
                )}
              </div>

              {/* Follow/Edit Button */}
              {isOwnProfile ? (
                <button className="mt-4 px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-bold hover:bg-blue-500/10 transition">
                  Edit profile
                </button>
              ) : (
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition">
                  Follow
                </button>
              )}
            </div>

            {/* Name & Handle */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold">
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              <p className="text-gray-500">@{userProfile.firstName?.toLowerCase()}</p>
            </div>

            {/* Bio */}
            {userProfile.bio && (
              <p className="text-white mb-3">{userProfile.bio}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-gray-500 mb-4 text-sm">
              {userProfile.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{userProfile.location}</span>
                </div>
              )}

              {userProfile.website && (
                <a
                  href={userProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-400 transition"
                >
                  <AiOutlineLink className="w-4 h-4" />
                  <span>{userProfile.website}</span>
                </a>
              )}

              {userProfile.joinedDate && (
                <div className="flex items-center gap-1">
                  <AiOutlineCalendar className="w-4 h-4" />
                  <span>Joined {userProfile.joinedDate}</span>
                </div>
              )}
            </div>

            {/* Follow Stats */}
            <div className="flex gap-6 mb-4">
              <div>
                <span className="font-bold text-white">
                  {userProfile.followingCount || 0}
                </span>
                <span className="text-gray-500 text-sm ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">
                  {userProfile.followersCount || 0}
                </span>
                <span className="text-gray-500 text-sm ml-1">Followers</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button className="flex-1 py-4 text-white font-bold border-b-2 border-blue-500 transition">
              Posts
            </button>
            <button className="flex-1 py-4 text-gray-500 hover:text-white transition">
              Replies
            </button>
            <button className="flex-1 py-4 text-gray-500 hover:text-white transition">
              Media
            </button>
            <button className="flex-1 py-4 text-gray-500 hover:text-white transition">
              Likes
            </button>
          </div>
        </div>

        {/* User's Posts */}
        {userTweets && userTweets.length > 0 ? (
          userTweets.map((tweet) => (
            <div
              key={tweet.id}
              className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                    {tweet.author.profileImageUrl ? (
                      <Image
                        src={tweet.author.profileImageUrl}
                        alt={tweet.author.firstName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                        <AiOutlineUser className="text-white text-lg" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-white text-base break-words">{tweet.content}</p>

                  {tweet.image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                      <Image
                        src={tweet.image}
                        alt="tweet"
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(tweet.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No posts yet</p>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="col-span-3 px-4 py-4 hidden xl:block">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-3 text-sm text-gray-500">
            <p>User ID: {userId}</p>
            <p>Joined: {userProfile.joinedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}