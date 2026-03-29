import { graphql } from "@/src/gql";
export const verifyGoogleToken=graphql(`#graphql
    query verifyGoogleToken($token:String!){
        verifyGoogleToken(token:$token)
    },

`);