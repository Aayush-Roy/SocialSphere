// // import { graphqlClient } from "@/gqlClients/api";
// // import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";
// // import { useQuery } from "@tanstack/react-query";
// // export const useCurrentUser =()=>{
// //     // const query = useQuery({
// //     //     queryKey:["current-user"],
// //     //     queryFn:()=>graphqClient.request(getCurrentUserQuery)
// //     // })
// //     //  return { ...query, user: query.data?.getCurrentUser };
// //      const query = useQuery({
// //     queryKey: ["getCurrentUser"],
// //     queryFn: () => graphqlClient.request(getCurrentUserQuery),
// //   });
// //   // return { ...query, user: query.data?.getCurrentUser };
// //   return { ...query, user: query.data?.getCurrentUser };
// // }

// // export const useGetUserById = (id: string) => {
// //   const query = useQuery({
// //     queryKey: ["getUserById"],
// //     queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
// //   });
// //   return { ...query, user: query.data?.getUserById };
// // };



// import { graphqlClient } from "@/gqlClients/api";
// import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";
// import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// export const useCurrentUser = () => {
//   const query = useQuery({
//     queryKey: ["getCurrentUser"],
//     queryFn: () => graphqlClient.request(getCurrentUserQuery),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
//   return { ...query, user: query.data?.getCurrentUser };
// };

// export const useGetUserById = (id: string) => {
//   const query = useQuery({
//     queryKey: ["getUserById", id],
//     queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     enabled: !!id, // Only run if id exists
//   });
//   return { ...query, user: query.data?.getUserById };
// };

// // ✅ FIXED: Follow/Unfollow with proper query client
// export const useFollowUser = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (followingId: string) =>
//       graphqlClient.request(followUserMutation, { followingId }),
//     onSuccess: (data) => {
//       console.log("✅ Follow successful:", data);
      
//       // Invalidate relevant queries to refetch
//       queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
//       queryClient.invalidateQueries({ queryKey: ["getUserById"] });
//       queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
//     },
//     onError: (error: any) => {
//       console.error("❌ Follow error:", error);
//     },
//   });

//   return {
//     followUser: mutation.mutate,
//     followUserAsync: mutation.mutateAsync,
//     isFollowing: mutation.isPending,
//     error: mutation.error,
//     isError: mutation.isError,
//   };
// };

// export const useUnfollowUser = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (followingId: string) =>
//       graphqlClient.request(unfollowUserMutation, { followingId }),
//     onSuccess: (data) => {
//       console.log("✅ Unfollow successful:", data);
      
//       // Invalidate relevant queries to refetch
//       queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
//       queryClient.invalidateQueries({ queryKey: ["getUserById"] });
//       queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
//     },
//     onError: (error: any) => {
//       console.error("❌ Unfollow error:", error);
//     },
//   });

//   return {
//     unfollowUser: mutation.mutate,
//     unfollowUserAsync: mutation.mutateAsync,
//     isUnfollowing: mutation.isPending,
//     error: mutation.error,
//     isError: mutation.isError,
//   };
// };



import { graphqlClient } from "@/gqlClients/api";
import { getCurrentUserQuery, getSuggestedUsersQuery, getUserByIdQuery } from "@/graphql/query/user";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
    staleTime: 1000 * 60 * 5,
  });

  // ✅ FIXED: Handle Apollo response structure
  return { 
    ...query, 
    user: query.data?.getCurrentUser  // Apollo wraps response in data object
  };
};

export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  // ✅ FIXED: Handle Apollo response structure
  return { 
    ...query, 
    user: query.data?.getUser  // Apollo wraps response in data object
  };
};

// ✅ Follow/Unfollow with proper query client
export const useFollowUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (followingId: string) =>
      graphqlClient.request(followUserMutation, { followingId }),
    onSuccess: (data) => {
      console.log("✅ Follow successful:", data);
      
      // Invalidate relevant queries to refetch
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      queryClient.invalidateQueries({ queryKey: ["getUserById"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
    onError: (error: any) => {
      console.error("❌ Follow error:", error);
    },
  });

  return {
    followUser: mutation.mutate,
    followUserAsync: mutation.mutateAsync,
    isFollowing: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};

// hooks/user.ts mein
export const useGetSuggestedUsers = () => {
  const query = useQuery({
    queryKey: ["suggested-users"],
    queryFn: () => graphqlClient.request(getSuggestedUsersQuery),
  });

  return { ...query, users: query.data?.suggestedUsers };
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (followingId: string) =>
      graphqlClient.request(unfollowUserMutation, { followingId }),
    onSuccess: (data) => {
      console.log("✅ Unfollow successful:", data);
      
      // Invalidate relevant queries to refetch
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      queryClient.invalidateQueries({ queryKey: ["getUserById"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
    onError: (error: any) => {
      console.error("❌ Unfollow error:", error);
    },
  });

  return {
    unfollowUser: mutation.mutate,
    unfollowUserAsync: mutation.mutateAsync,
    isUnfollowing: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};