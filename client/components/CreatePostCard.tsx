// import { useCreateTweet } from "@/hooks/tweet";
// import { Tweet } from "@/src/gql/graphql";
// import { Content } from "next/font/google";
// import React, { useState, useRef, useCallback } from "react";
// import {
//   AiOutlineFileImage,
//   AiOutlineSmile,
//   AiOutlineCalendar,
//   AiOutlineClose,
// } from "react-icons/ai";
// import { BiPoll } from "react-icons/bi";
// import { toast } from "sonner";

// interface CreatePostCardProps {
//   userAvatar?: string;
//   userName?: string;
//   onPostCreate?: (postData: PostData) => void;
// }

// export interface PostData {
//   data:Tweet
// }

// const CreatePostCard: React.FC<CreatePostCardProps> = ({
//   userAvatar = "https://via.placeholder.com/48",
//   userName = "You",
//   onPostCreate,
// }) => {
//   // const [postText, setPostText] = useState("");
//   const[content,setContent] = useState("");
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isPosting, setIsPosting] = useState(false);
//   const{mutate}=useCreateTweet()
//   const uploadImage = async (file: File): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch(
//       process.env.NEXT_PUBLIC_API_URL || "https://socialspherebackend.onrender.com/api/upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     // ✅ Check if response is ok
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || "Upload failed");
//     }

//     const data = await res.json();

//     // ✅ Check if URL exists
//     if (!data.url) {
//       throw new Error("No URL returned from server");
//     }

//     return data.url;
//   } catch (error) {
//     console.error("Image upload error:", error);
//     throw error; // Re-throw to be caught by handlePost
//   }
// };

// const handlePost = useCallback(async () => {
//   if (!content.trim() && selectedImages.length === 0) {
//     toast.error("Tweet cannot be empty");
//     return;
//   }

//   setIsPosting(true);

//   try {
//     let imageUrl = "";

//     // Upload image with proper error handling
//     if (selectedImages.length > 0) {
//       try {
//         imageUrl = await uploadImage(selectedImages[0]);
//         console.log("Image uploaded:", imageUrl); // Debug
//       } catch (uploadError) {
//         setIsPosting(false);
//         toast.error("Image upload failed");
//         return; // Stop here
//       }
//     }

//     // Only mutate if upload succeeded
//     mutate(
//       {
//         content,
//         imageUrl: imageUrl || undefined, // Send undefined if no image
//       },
//       {
//         onSuccess: () => {
//           setContent("");
//           setSelectedImages([]);
//           setImagePreviews([]);
//           setIsPosting(false);
//           toast.success("Tweet posted 🚀");
//         },
//         onError: (err) => {
//           console.error("Mutation error:", err);
//           setIsPosting(false);
//           toast.error("Failed to post tweet");
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     setIsPosting(false);
//     toast.error("Something went wrong");
//   }
// }, [content, selectedImages, mutate]);
//   const emojis = ["😀", "😂", "😍", "🔥", "✨", "👍", "💯", "🎉", "🚀", "💯"];

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);

//     if (files.length + selectedImages.length > 4) {
//       toast.error("Maximum 4 images allowed");
//       return;
//     }

//     files.forEach((file) => {
//       if (!file.type.startsWith("image/")) {
//         toast.error("Only image files allowed");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreviews((prev) => [...prev, event.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });

//     setSelectedImages((prev) => [...prev, ...files]);
//   };

//   const removeImage = (index: number) => {
//     setSelectedImages((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const addEmoji = (emoji: string) => {
//     // setPostText((prev) => prev + emoji);
//     setContent((prev) => prev + emoji);
//   };





//   return (
//     <div className="border-b border-gray-700 p-4 hover:bg-gray-900/50 transition">
//       <div className="flex gap-4">
//         {/* Avatar */}
//         <div className="flex-shrink-0">
//           <img
//             src={userAvatar}
//             alt={userName}
//             className="w-12 h-12 rounded-full bg-gray-700"
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Text Input */}
//           <textarea
//             value={content}
//             // onChange={(e) => setPostText(e.target.value)}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="What's happening!?"
//             className="w-full bg-transparent text-2xl text-white placeholder-gray-500 outline-none resize-none"
//             rows={3}
//           />

//           {/* Image Previews */}
//           {imagePreviews.length > 0 && (
//             <div className="mt-4 grid grid-cols-2 gap-2">
//               {imagePreviews.map((preview, idx) => (
//                 <div key={idx} className="relative">
//                   <img
//                     src={preview}
//                     alt={`preview-${idx}`}
//                     className="w-full h-48 object-cover rounded-lg border border-gray-600"
//                   />
//                   <button
//                     onClick={() => removeImage(idx)}
//                     className="absolute top-2 left-2 bg-black/70 rounded-full p-1 hover:bg-black transition"
//                   >
//                     <AiOutlineClose className="w-5 h-5 text-white" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="mt-4 flex items-center justify-between">
//             <div className="flex gap-2">
//               {/* Image Upload */}
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition"
//                 title="Add photos"
//               >
//                 <AiOutlineFileImage className="w-5 h-5" />
//               </button>

//               {/* Emoji Picker Toggle */}
//               <button
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                 className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition"
//                 title="Add emoji"
//               >
//                 <AiOutlineSmile className="w-5 h-5" />
//               </button>

//               {/* Poll */}
//               <button
//                 className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition opacity-50 cursor-not-allowed"
//                 title="Add poll (coming soon)"
//               >
//                 <BiPoll className="w-5 h-5" />
//               </button>

//               {/* Schedule */}
//               <button
//                 className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition opacity-50 cursor-not-allowed"
//                 title="Schedule post (coming soon)"
//               >
//                 <AiOutlineCalendar className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Post Button */}
//             <button
//               onClick={handlePost}
//               disabled={
//                 // isPosting || (!postText.trim() && selectedImages.length === 0)
//                 isPosting || (!content.trim() && selectedImages.length === 0)
//               }
//               className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {isPosting ? "Posting..." : "Post"}
//             </button>
//           </div>

//           {/* Emoji Picker Popup */}
//           {showEmojiPicker && (
//             <div className="mt-3 bg-gray-900 border border-gray-700 rounded-lg p-3">
//               <div className="flex flex-wrap gap-2">
//                 {emojis.map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => {
//                       addEmoji(emoji);
//                       setShowEmojiPicker(false);
//                     }}
//                     className="text-2xl hover:bg-gray-800 p-2 rounded transition"
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Hidden File Input */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageSelect}
//             className="hidden"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePostCard;
import { useCreateTweet } from "@/hooks/tweet";
import { Tweet } from "@/src/gql/graphql";
import React, { useState, useRef, useCallback } from "react";
import {
  AiOutlineFileImage,
  AiOutlineSmile,
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineSend,
} from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { toast } from "sonner";

interface CreatePostCardProps {
  userAvatar?: string;
  userName?: string;
  onPostCreate?: (postData: PostData) => void;
}

export interface PostData {
  data: Tweet;
}

const CreatePostCard: React.FC<CreatePostCardProps> = ({
  userAvatar = "https://via.placeholder.com/48",
  userName = "You",
  onPostCreate,
}) => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPosting, setIsPosting] = useState(false);
  const { mutate } = useCreateTweet();

  const maxChars = 500;
  const charPercentage = (charCount / maxChars) * 100;
  const isNearLimit = charPercentage > 80;
  const isOverLimit = charPercentage > 100;

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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await res.json();

      if (!data.url) {
        throw new Error("No URL returned from server");
      }

      return data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handlePost = useCallback(async () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }

    if (charCount > maxChars) {
      toast.error(`Post exceeds ${maxChars} character limit`);
      return;
    }

    setIsPosting(true);

    try {
      let imageUrl = "";

      if (selectedImages.length > 0) {
        try {
          imageUrl = await uploadImage(selectedImages[0]);
        } catch (uploadError) {
          setIsPosting(false);
          toast.error("Image upload failed");
          return;
        }
      }

      mutate(
        {
          content,
          imageUrl: imageUrl || undefined,
        },
        {
          onSuccess: () => {
            setContent("");
            setCharCount(0);
            setSelectedImages([]);
            setImagePreviews([]);
            setIsPosting(false);
            toast.success("Post shared! 🚀");
          },
          onError: (err) => {
            console.error("Mutation error:", err);
            setIsPosting(false);
            toast.error("Failed to share post");
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      setIsPosting(false);
      toast.error("Something went wrong");
    }
  }, [content, selectedImages, charCount, mutate]);

  const emojis = ["😀", "😂", "😍", "🔥", "✨", "👍", "💯", "🎉", "🚀", "💡", "🎈", "⭐"];

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
    const newContent = content + emoji;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  return (
    <div className="border-b border-gray-800/50 p-4 sm:p-6 hover:bg-gray-900/20 transition bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-gray-700 hover:ring-blue-500/50 transition">
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full object-cover bg-gradient-to-br from-blue-500 to-purple-600"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Text Input */}
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Share your thoughts... ✨"
            className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-gray-500 outline-none resize-none font-medium"
            rows={3}
          />

          {/* Character Count */}
          {charCount > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isOverLimit
                      ? "bg-red-500"
                      : isNearLimit
                      ? "bg-yellow-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
                  style={{ width: `${Math.min(charPercentage, 100)}%` }}
                />
              </div>
              <span
                className={`text-xs font-semibold flex-shrink-0 ${
                  isOverLimit
                    ? "text-red-500"
                    : isNearLimit
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {charCount}/{maxChars}
              </span>
            </div>
          )}

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden">
                  <img
                    src={preview}
                    alt={`preview-${idx}`}
                    className="w-full h-40 sm:h-48 object-cover rounded-xl border border-gray-700/50"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black transition rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <AiOutlineClose className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1 sm:gap-2">
              {/* Image Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-full transition group"
                title="Add photos"
              >
                <AiOutlineFileImage className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Emoji Picker */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-full transition group"
                title="Add emoji"
              >
                <AiOutlineSmile className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Poll */}
              <button
                className="text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-full transition opacity-50 cursor-not-allowed"
                title="Add poll (coming soon)"
              >
                <BiPoll className="w-5 h-5" />
              </button>

              {/* Schedule */}
              <button
                className="text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-full transition opacity-50 cursor-not-allowed"
                title="Schedule post (coming soon)"
              >
                <AiOutlineCalendar className="w-5 h-5" />
              </button>
            </div>

            {/* Post Button */}
            <button
              onClick={handlePost}
              disabled={isPosting || (!content.trim() && selectedImages.length === 0) || isOverLimit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 group"
            >
              <AiOutlineSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{isPosting ? "Posting..." : "Post"}</span>
            </button>
          </div>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="mt-4 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      addEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-2xl hover:bg-gray-700/50 p-2 rounded-lg transition hover:scale-125 duration-150"
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