// export const queries=`#graphql

//     verifyGoogleToken(token:String!):String
//     getCurrentUser:User

// `
export const queries = `#graphql

    verifyGoogleToken(token: String!): String
    getCurrentUser: User
    getUser(id: ID!): User
    # getUserById(id: ID!): User
    suggestedUsers: [User!]!
`