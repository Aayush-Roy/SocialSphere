// import { graphql } from "@/gql";

import { graphql } from "@/src/gql";

// export const followUserMutation = graphql(`
//   #graphql
//   mutation followUser($to: ID!) {
//     followUser(to: $to)
//   }
// `);
// export const unfollowUserMutation = graphql(`
//   #graphql
//   mutation unfollowUser($to: ID!) {
//     unfollowUser(to: $to)
//   }
// `);

// import { graphql } from "@/gql";


export const followUserMutation = graphql(`
  #graphql
  mutation followUser($followingId: ID!) {
    followUser(followingId: $followingId) {
      success
      message
      user {
        id
        firstName
        lastName
        profileImageUrl
        followerCount
        followingCount
      }
    }
  }
`);

export const unfollowUserMutation = graphql(`
  #graphql
  mutation unfollowUser($followingId: ID!) {
    unfollowUser(followingId: $followingId) {
      success
      message
      user {
        id
        firstName
        lastName
        profileImageUrl
        followerCount
        followingCount
      }
    }
  }
`);