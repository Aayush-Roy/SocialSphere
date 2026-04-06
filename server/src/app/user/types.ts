// export const types = `#graphql

//     type User{
//         id:ID!
//         firstName:String!
//         lastName:String
//         email:String!
//         profileImageUrl:String
//         tweets:[Tweet]
    
//     }


// `

export const types = `#graphql

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageUrl: String
        tweets: [Tweet]
        recommendedUsers:[User]
        followers: [User!]!
        following: [User!]!
        followerCount: Int!
        followingCount: Int!
        isFollowing: Boolean!
    }

    

    type FollowResponse {
        success: Boolean!
        message: String!
        user: User!
    }
`