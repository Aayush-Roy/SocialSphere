export const mutations = `#graphql

    followUser(followingId: ID!): FollowResponse!
    unfollowUser(followingId: ID!): FollowResponse!
`