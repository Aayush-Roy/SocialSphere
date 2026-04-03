// import { graphql } from "@/src/gql";
// export const verifyGoogleToken=graphql(`#graphql
//     query verifyGoogleToken($token:String!){
//         verifyGoogleToken(token:$token)
//     }

// `);



// // export const getCurrentUserQuery = graphql(`#graphql
    
// //     getCurrentUser {
// //     id
// //     profileImageUrl
// //     email
// //     firstName
// //     lastName
// //   }
  
 
// // `)

// export const getCurrentUserQuery = graphql(`#graphql
//   query getCurrentUser {
//     getCurrentUser {
//       id
//       profileImageUrl
//       email
//       firstName
//       lastName
//     }
//   }
// `);
// ❌ remove this
// import { graphql } from "@/src/gql";

export const verifyGoogleToken = `
  query verifyGoogleToken($token:String!){
    verifyGoogleToken(token:$token)
  }
`;

export const getCurrentUserQuery = `
  query getCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      email
      firstName
      lastName
      tweets{
        id
        content
      }
    }
  }
`;