export const queries=`#graphql

    verifyGoogleToken(token:String!):String
    getCurrentUser:User

`

export const getCurrentUserQuery = `#graphql

    getCurrentUser {
    id
    profileImageUrl
    email
    firstName
    lastName
  }

`