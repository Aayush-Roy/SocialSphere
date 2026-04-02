import { graphql } from "@/src/gql";

export const getAllTweetsQuery=graphql(`#graphql
    query GetAllTweets{
       getAllTweets {
    id
    content
    imageUrl
    author {
      firstName
      lastName
      profileImageUrl
    }
  }
    }

`)
