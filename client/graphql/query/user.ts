// // // import { graphql } from "@/src/gql";
// // // export const verifyGoogleToken=graphql(`#graphql
// // //     query verifyGoogleToken($token:String!){
// // //         verifyGoogleToken(token:$token)
// // //     }

import { graphql } from "@/src/gql";

export const verifyGoogleToken = `
  query verifyGoogleToken($token:String!){
    verifyGoogleToken(token:$token)
  }
`;


export const getCurrentUserQuery = `
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      profileImageUrl
  
      followers {
        id
        firstName
        email
      }

      following {
        id
        firstName
        email
      }

      followerCount
      followingCount
      isFollowing
    }
  }
`;
export const getUserByIdQuery = `
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      profileImageUrl
      followerCount
      followingCount
      isFollowing
      
      tweets {
        id
        content
        imageUrl

        author {
          id
          firstName
          lastName
          profileImageUrl
        }
      }

      followers {
        id
        firstName
        lastName
      }

      following {
        id
        firstName
        lastName
      }
    }
  }
`;

export const getSuggestedUsersQuery = graphql(`
  query getSuggestedUsers {
    suggestedUsers {
      id
      email
      firstName
      lastName
      profileImageUrl
      followerCount
      followingCount
      isFollowing  # ✅ NEW: Added this field
    }
  }
`);