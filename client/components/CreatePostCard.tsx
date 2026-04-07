import { useCreateTweet } from "@/hooks/tweet";
import { Tweet } from "@/src/gql/graphql";
import { Content } from "next/font/google";
import React, { useState, useRef, useCallback } from "react";
import {
  AiOutlineFileImage,
  AiOutlineSmile,
  AiOutlineCalendar,
  AiOutlineClose,
} from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { toast } from "sonner";

interface CreatePostCardProps {
  userAvatar?: string;
  userName?: string;
  onPostCreate?: (postData: PostData) => void;
}

export interface PostData {
  data:Tweet
}

const CreatePostCard: React.FC<CreatePostCardProps> = ({
  userAvatar = "https://via.placeholder.com/48",
  userName = "You",
  onPostCreate,
}) => {
  // const [postText, setPostText] = useState("");
  const[content,setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPosting, setIsPosting] = useState(false);
  const{mutate}=useCreateTweet()
  const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL || "https://socialspherebackend.onrender.com/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    // ✅ Check if response is ok
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const data = await res.json();

    // ✅ Check if URL exists
    if (!data.url) {
      throw new Error("No URL returned from server");
    }

    return data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error; // Re-throw to be caught by handlePost
  }
};

const handlePost = useCallback(async () => {
  if (!content.trim() && selectedImages.length === 0) {
    toast.error("Tweet cannot be empty");
    return;
  }

  setIsPosting(true);

  try {
    let imageUrl = "";

    // Upload image with proper error handling
    if (selectedImages.length > 0) {
      try {
        imageUrl = await uploadImage(selectedImages[0]);
        console.log("Image uploaded:", imageUrl); // Debug
      } catch (uploadError) {
        setIsPosting(false);
        toast.error("Image upload failed");
        return; // Stop here
      }
    }

    // Only mutate if upload succeeded
    mutate(
      {
        content,
        imageUrl: imageUrl || undefined, // Send undefined if no image
      },
      {
        onSuccess: () => {
          setContent("");
          setSelectedImages([]);
          setImagePreviews([]);
          setIsPosting(false);
          toast.success("Tweet posted 🚀");
        },
        onError: (err) => {
          console.error("Mutation error:", err);
          setIsPosting(false);
          toast.error("Failed to post tweet");
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    setIsPosting(false);
    toast.error("Something went wrong");
  }
}, [content, selectedImages, mutate]);
  const emojis = ["😀", "😂", "😍", "🔥", "✨", "👍", "💯", "🎉", "🚀", "💯"];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + selectedImages.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addEmoji = (emoji: string) => {
    // setPostText((prev) => prev + emoji);
    setContent((prev) => prev + emoji);
  };





  return (
    <div className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={userAvatar}
            alt={userName}
            className="w-12 h-12 rounded-full bg-gray-700"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Text Input */}
          <textarea
            value={content}
            // onChange={(e) => setPostText(e.target.value)}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening!?"
            className="w-full bg-transparent text-2xl text-white placeholder-gray-500 outline-none resize-none"
            rows={3}
          />

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={preview}
                    alt={`preview-${idx}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-600"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 left-2 bg-black/70 rounded-full p-1 hover:bg-black transition"
                  >
                    <AiOutlineClose className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {/* Image Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition"
                title="Add photos"
              >
                <AiOutlineFileImage className="w-5 h-5" />
              </button>

              {/* Emoji Picker Toggle */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition"
                title="Add emoji"
              >
                <AiOutlineSmile className="w-5 h-5" />
              </button>

              {/* Poll */}
              <button
                className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition opacity-50 cursor-not-allowed"
                title="Add poll (coming soon)"
              >
                <BiPoll className="w-5 h-5" />
              </button>

              {/* Schedule */}
              <button
                className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition opacity-50 cursor-not-allowed"
                title="Schedule post (coming soon)"
              >
                <AiOutlineCalendar className="w-5 h-5" />
              </button>
            </div>

            {/* Post Button */}
            <button
              onClick={handlePost}
              disabled={
                // isPosting || (!postText.trim() && selectedImages.length === 0)
                isPosting || (!content.trim() && selectedImages.length === 0)
              }
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="mt-3 bg-gray-900 border border-gray-700 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      addEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-2xl hover:bg-gray-800 p-2 rounded transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;