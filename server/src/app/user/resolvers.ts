// // import axios from "axios"
// // import { prisma } from "../../prismaClient";
// // import JWTService from "../services/jwt";
// // import { GraphqlContext } from "../../interfaces";
// // import { Tweet, User } from "@prisma/client";
// //  interface GoogleTokenInfo {
// //   iss?: string;
// //   azp?: string;
// //   aud?: string;
// //   sub?: string;
// //   email: string;
// //   email_verified: string; // Google sometimes string deta hai
// //   nbf?: string;
// //   name?: string;
// //   picture?: string;
// //   given_name?: string;
// //   family_name?: string;
// //   iat?: string;
// //   exp?: string;
// //   jti?: string;
// //   alg?: string;
// //   kid?: string;
// //   typ?: string;
// // }
// // const queries = {
// //     verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
// //         // return token;
// //         const googleToken = token
// //         const googleOauthURL = new URL(`https://www.googleapis.com/oauth2/v3/tokeninfo`)
// //         googleOauthURL.searchParams.set('id_token', googleToken)
// //         const {data} = await axios.get<GoogleTokenInfo>(googleOauthURL.toString(),{
// //             responseType:'json'
// //         })

// //         const user = await prisma.user.findUnique({where:{email:data.email}})
// //         if(!user) {
// //             await prisma.user.create({
// //                 data:{
// //                     email:data.email,
            
// //                      firstName: data.given_name ?? "",
// //                      lastName: data.family_name ?? "",
// //                     profileImageUrl:data.picture
// //                 }
// //             })
// //         }
// //         const userInDb = await prisma.user.findUnique({where:{email:data.email}});
// //         if(!userInDb) throw new Error("User with this email not found!");
// //         const userToken = JWTService.generateTokenForUser(userInDb);
// //         // console.log(data);
// //         return userToken;
// //     },
// //     getCurrentUser:async(parent:any, args:any,ctx:GraphqlContext)=>{
// //         console.log(ctx)
// //         const id = ctx.user?.id;
// //         if(!id) return null;
// //         const user = await prisma.user.findUnique({where:{
// //             id:id
// //         }})
// //         return user;
// //     },

  


// // }


// // const extraResolvers = {

// //  User:{

// //     tweets:(parent:User)=>
// //         prisma.tweet.findMany({
// //             where:{authorId:parent.id}
// //         }),

    

// //  }

// // }
// // export const resolvers = {queries,extraResolvers}



// import axios from "axios"
// import { prisma } from "../../prismaClient";
// import JWTService from "../services/jwt";
// import { GraphqlContext } from "../../interfaces";
// import { Tweet, User } from "@prisma/client";

// interface GoogleTokenInfo {
//   iss?: string;
//   azp?: string;
//   aud?: string;
//   sub?: string;
//   email: string;
//   email_verified: string; // Google sometimes string deta hai
//   nbf?: string;
//   name?: string;
//   picture?: string;
//   given_name?: string;
//   family_name?: string;
//   iat?: string;
//   exp?: string;
//   jti?: string;
//   alg?: string;
//   kid?: string;
//   typ?: string;
// }

// const queries = {
//   verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
//     const googleToken = token
//     const googleOauthURL = new URL(`https://www.googleapis.com/oauth2/v3/tokeninfo`)
//     googleOauthURL.searchParams.set('id_token', googleToken)
//     const { data } = await axios.get<GoogleTokenInfo>(googleOauthURL.toString(), {
//       responseType: 'json'
//     })

//     const user = await prisma.user.findUnique({ where: { email: data.email } })
//     if (!user) {
//       await prisma.user.create({
//         data: {
//           email: data.email,
//           firstName: data.given_name ?? "",
//           lastName: data.family_name ?? "",
//           profileImageUrl: data.picture
//         }
//       })
//     }
//     const userInDb = await prisma.user.findUnique({ where: { email: data.email } });
//     if (!userInDb) throw new Error("User with this email not found!");
//     const userToken = JWTService.generateTokenForUser(userInDb);
//     return userToken;
//   },

//   getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
//     const id = ctx.user?.id;
//     if (!id) return null;
//     const user = await prisma.user.findUnique({ where: { id: id } })
//     return user;
//   },

//   getUser: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
//     const user = await prisma.user.findUnique({
//       where: { id }
//     })
//     if (!user) throw new Error("User not found!");
//     return user;
//   },

//   suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
//     const currentUserId = ctx.user?.id;
//     if (!currentUserId) throw new Error("User not authenticated!");

//     // Get all users except current user and those already following
//     const suggestedUsers = await prisma.user.findMany({
//       where: {
//         AND: [
//           { id: { not: currentUserId } },
//           {
//             followers: {
//               none: {
//                 followerId: currentUserId
//               }
//             }
//           }
//         ]
//       },
//       take: 10 // Limit to 10 suggestions
//     })

//     return suggestedUsers;
//   }
// }

// const mutations = {
//   followUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
//     const followerId = ctx.user?.id;
//     if (!followerId) throw new Error("User not authenticated!");

//     // Check if user exists
//     if (followerId === followingId) {
//       throw new Error("You cannot follow yourself!");
//     }

//     const userToFollow = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
//     if (!userToFollow) throw new Error("User to follow not found!");

//     // Check if already following
//     const alreadyFollowing = await prisma.follows.findUnique({
//       where: {
//         followerId_followingId: {
//           followerId,
//           followingId
//         }
//       }
//     })

//     if (alreadyFollowing) {
//       throw new Error("You are already following this user!");
//     }

//     // Create follow relationship
//     await prisma.follows.create({
//       data: {
//         followerId,
//         followingId
//       }
//     })

//     const user = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
//     console.log("from resolvers",user)
//     return {
//       success: true,
//       message: `Successfully followed ${user?.firstName}!`,
//       user
//     }
//   },

//   unfollowUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
//     const followerId = ctx.user?.id;
//     if (!followerId) throw new Error("User not authenticated!");

//     // Check if user exists
//     const userToUnfollow = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
//     if (!userToUnfollow) throw new Error("User to unfollow not found!");

//     // Check if following
//     const isFollowing = await prisma.follows.findUnique({
//       where: {
//         followerId_followingId: {
//           followerId,
//           followingId
//         }
//       }
//     })

//     if (!isFollowing) {
//       throw new Error("You are not following this user!");
//     }

//     // Delete follow relationship
//     await prisma.follows.delete({
//       where: {
//         followerId_followingId: {
//           followerId,
//           followingId
//         }
//       }
//     })

//     const user = await prisma.user.findUnique({
//       where: { id: followingId }
//     })

//     return {
//       success: true,
//       message: `Successfully unfollowed ${user?.firstName}!`,
//       user
//     }
//   }
// }

// // const extraResolvers = {
// //   User: {
// //     tweets: (parent: User) => prisma.tweet.findMany({ where: { authorId: parent.id } }),

// //     followers: (parent: User) => prisma.user.findMany({
// //       where: {
// //         following: {
// //           some: {
// //             followingId: parent.id
// //           }
// //         }
// //       }
// //     }),

// //     following: (parent: User) => prisma.user.findMany({
// //       where: {
// //         followers: {
// //           some: {
// //             followerId: parent.id
// //           }
// //         }
// //       }
// //     }),

// //     followerCount: async (parent: User) => {
// //       const count = await prisma.follows.count({
// //         where: { followingId: parent.id }
// //       })
// //       return count;
// //     },

// //     followingCount: async (parent: User) => {
// //       const count = await prisma.follows.count({
// //         where: { followerId: parent.id }
// //       })
// //       return count;
// //     },

// //     isFollowing: async (parent: User, args: any, ctx: GraphqlContext) => {
// //       const currentUserId = ctx.user?.id;
// //       if (!currentUserId) return false;

// //       const isFollowing = await prisma.follows.findUnique({
// //         where: {
// //           followerId_followingId: {
// //             followerId: currentUserId,
// //             followingId: parent.id
// //           }
// //         }
// //       })
// //       return !!isFollowing;
// //     }
// //   }
// // }
// // ✅ NAYA (SAHI):
// const extraResolvers = {
//   User: {
//     tweets: (parent: User) => prisma.tweet.findMany({ where: { authorId: parent.id } }),

//     // ✅ FOLLOWERS = Jisne current user ko follow kiya
//     followers: (parent: User) => prisma.user.findMany({
//       where: {
//         followers: {
//           some: {
//             followingId: parent.id  // ✅ CHANGED
//           }
//         }
//       }
//     }),

//     // ✅ FOLLOWING = Jinhe current user follow kar raha hai
//     following: (parent: User) => prisma.user.findMany({
//       where: {
//         following: {
//           some: {
//             followerId: parent.id  // ✅ CHANGED
//           }
//         }
//       }
//     }),

//     followerCount: async (parent: User) => {
//       const count = await prisma.follows.count({
//         where: { followingId: parent.id }
//       })
//       return count;
//     },

//     followingCount: async (parent: User) => {
//       const count = await prisma.follows.count({
//         where: { followerId: parent.id }
//       })
//       return count;
//     },

//     isFollowing: async (parent: User, args: any, ctx: GraphqlContext) => {
//       const currentUserId = ctx.user?.id;
//       if (!currentUserId) return false;

//       const isFollowing = await prisma.follows.findUnique({
//         where: {
//           followerId_followingId: {
//             followerId: currentUserId,
//             followingId: parent.id
//           }
//         }
//       })
//       return !!isFollowing;
//     }
//   }
// }
// export const resolvers = { queries, mutations, extraResolvers }
import axios from "axios"
import { prisma } from "../../prismaClient";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { Tweet, User } from "@prisma/client";
import { redisClient } from "../../redis";

interface GoogleTokenInfo {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  nbf?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token
    const googleOauthURL = new URL(`https://www.googleapis.com/oauth2/v3/tokeninfo`)
    googleOauthURL.searchParams.set('id_token', googleToken)
    const { data } = await axios.get<GoogleTokenInfo>(googleOauthURL.toString(), {
      responseType: 'json'
    })

    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
      await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.given_name ?? "",
          lastName: data.family_name ?? "",
          profileImageUrl: data.picture
        }
      })
    }
    const userInDb = await prisma.user.findUnique({ where: { email: data.email } });
    if (!userInDb) throw new Error("User with this email not found!");
    const userToken = JWTService.generateTokenForUser(userInDb);
    return userToken;
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;
    const user = await prisma.user.findUnique({ where: { id: id } })
    return user;
  },
  // suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
  //   const currentUserId = ctx.user?.id;
  //   if (!currentUserId) throw new Error("User not authenticated!");

  //   const suggestedUsers = await prisma.user.findMany({
  //     where: {
  //       AND: [
  //         { id: { not: currentUserId } },
  //         {
  //           followers: {
  //             none: {
  //               followerId: currentUserId
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     take: 10
  //   })

  //   return suggestedUsers;
  // },
  suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
  const currentUserId = ctx.user?.id;
  const cachedValue = await redisClient.get(`RECOMMENDED_USERS:${ctx.user?.id}`)
  if(cachedValue) return JSON.parse(cachedValue);
  if (!currentUserId) throw new Error("User not authenticated!");

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: currentUserId } },

        {
          following: {
            none: {
              followerId: currentUserId
            }
          }
        }

      ]
    },
    take: 10
  });
  await redisClient.set(`RECOMMENDED_USERS:${ctx.user?.id}`,JSON.stringify(users));
  return users;
},
  getUser: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    if (!user) throw new Error("User not found!");
    return user;
  },
   
  // suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
  //   const currentUserId = ctx.user?.id;
  //   if (!currentUserId) throw new Error("User not authenticated!");

  //   const suggestedUsers = await prisma.user.findMany({
  //     where: {
  //       AND: [
  //         { id: { not: currentUserId } },
  //         {
  //           followers: {
  //             none: {
  //               followerId: currentUserId
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     take: 10
  //   })

  //   return suggestedUsers;
  // }
}

const mutations = {
  followUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
    const followerId = ctx.user?.id;
    if (!followerId) throw new Error("User not authenticated!");

    if (followerId === followingId) {
      throw new Error("You cannot follow yourself!");
    }

    const userToFollow = await prisma.user.findUnique({
      where: { id: followingId }
    })
    if (!userToFollow) throw new Error("User to follow not found!");

    const alreadyFollowing = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })

    if (alreadyFollowing) {
      throw new Error("You are already following this user!");
    }

    await prisma.follows.create({
      data: {
        followerId,
        followingId
      }
    })

    await redisClient.del(`RECOMMENDED_USERS:${ctx.user?.id}`)

    const user = await prisma.user.findUnique({
      where: { id: followingId }
    })
    
    return {
      success: true,
      message: `Successfully followed ${user?.firstName}!`,
      user
    }
   
  },


  unfollowUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
    const followerId = ctx.user?.id;
    if (!followerId) throw new Error("User not authenticated!");

    const userToUnfollow = await prisma.user.findUnique({
      where: { id: followingId }
    })
    if (!userToUnfollow) throw new Error("User to unfollow not found!");

    const isFollowing = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })

    if (!isFollowing) {
      throw new Error("You are not following this user!");
    }

    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })

    await redisClient.del(`RECOMMENDED_USERS:${ctx.user?.id}`)

    const user = await prisma.user.findUnique({
      where: { id: followingId }
    })

    return {
      success: true,
      message: `Successfully unfollowed ${user?.firstName}!`,
      user
    }
  }
}

// ✅ FIXED: Added isFollowing field resolver
const extraResolvers = {
  User: {
    tweets: (parent: User) => prisma.tweet.findMany({ where: { authorId: parent.id } }),

    followers: (parent: User) => prisma.user.findMany({
      where: {
        followers: {
          some: {
            followingId: parent.id
          }
        }
      }
    }),

    following: (parent: User) => prisma.user.findMany({
      where: {
        following: {
          some: {
            followerId: parent.id
          }
        }
      }
    }),

    followerCount: async (parent: User) => {
      const count = await prisma.follows.count({
        where: { followingId: parent.id }
      })
      return count;
    },

    followingCount: async (parent: User) => {
      const count = await prisma.follows.count({
        where: { followerId: parent.id }
      })
      return count;
    },
    
    // ✅ NEW: isFollowing resolver - checks if current user is following this user
    isFollowing: async (parent: User, args: any, ctx: GraphqlContext) => {
      const currentUserId = ctx.user?.id;
      
      // Agar user authenticated nahi hai to false return karo
      if (!currentUserId) return false;
      
      // Agar same user hai to false (can't follow yourself)
      if (currentUserId === parent.id) return false;

      // Check if current user is following this user
      const isFollowing = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: parent.id
          }
        }
      })
      
      return !!isFollowing;
    }
  }
}

export const resolvers = { queries, mutations, extraResolvers }