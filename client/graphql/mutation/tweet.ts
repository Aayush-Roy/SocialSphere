import { graphql } from "@/src/gql";

// export const createTweetMutation=graphql(`#graphql
//     mutation CreateTweet($payload: CreateTweetData!) {
//   createTweet(payload: $payload) {
//     id
//     content
//     author {
//       id
//       firstName
//       profileImageUrl
//     }
//   }
//     }
// `)
export const createTweetMutation = `
mutation CreateTweet($payload: CreateTweetData!) {
  createTweet(payload: $payload) {
    id
    content
  }
}
`;