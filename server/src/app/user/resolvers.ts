
// import axios from "axios"
// import { prisma } from "../../prismaClient";
// import JWTService from "../services/jwt";
// import { GraphqlContext } from "../../interfaces";
// import { Tweet, User } from "@prisma/client";
// import { redisClient } from "../../redis";

// interface GoogleTokenInfo {
//   iss?: string;
//   azp?: string;
//   aud?: string;
//   sub?: string;
//   email: string;
//   email_verified: string;
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
 

//   suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
//   const currentUserId = ctx.user?.id;
//   const cachedValue = await redisClient.get(`RECOMMENDED_USERS:${ctx.user?.id}`)
//   if(cachedValue) return JSON.parse(cachedValue);
//   if (!currentUserId) throw new Error("User not authenticated!");

//   const users = await prisma.user.findMany({
//     where: {
//       AND: [
//         { id: { not: currentUserId } },

//         {
//           following: {
//             none: {
//               followerId: currentUserId
//             }
//           }
//         }

//       ]
//     },
//     take: 10
//   });
//   await redisClient.set(`RECOMMENDED_USERS:${ctx.user?.id}`,JSON.stringify(users));
//   return users;
// },
//   getUser: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
//     const user = await prisma.user.findUnique({
//       where: { id }
//     })
//     if (!user) throw new Error("User not found!");
//     return user;
//   },
   
  
// }

// const mutations = {
//   followUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
//     const followerId = ctx.user?.id;
//     if (!followerId) throw new Error("User not authenticated!");

//     if (followerId === followingId) {
//       throw new Error("You cannot follow yourself!");
//     }

//     const userToFollow = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
//     if (!userToFollow) throw new Error("User to follow not found!");

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

//     await prisma.follows.create({
//       data: {
//         followerId,
//         followingId
//       }
//     })

//     await redisClient.del(`RECOMMENDED_USERS:${ctx.user?.id}`)

//     const user = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
    
//     return {
//       success: true,
//       message: `Successfully followed ${user?.firstName}!`,
//       user
//     }
   
//   },


//   unfollowUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
//     const followerId = ctx.user?.id;
//     if (!followerId) throw new Error("User not authenticated!");

//     const userToUnfollow = await prisma.user.findUnique({
//       where: { id: followingId }
//     })
//     if (!userToUnfollow) throw new Error("User to unfollow not found!");

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

//     await prisma.follows.delete({
//       where: {
//         followerId_followingId: {
//           followerId,
//           followingId
//         }
//       }
//     })

//     await redisClient.del(`RECOMMENDED_USERS:${ctx.user?.id}`)

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

// // ✅ FIXED: Added isFollowing field resolver
// const extraResolvers = {
//   User: {
//     tweets: (parent: User) => prisma.tweet.findMany({ where: { authorId: parent.id } }),

//     followers: (parent: User) => prisma.user.findMany({
//       where: {
//         followers: {
//           some: {
//             followingId: parent.id
//           }
//         }
//       }
//     }),

//     following: (parent: User) => prisma.user.findMany({
//       where: {
//         following: {
//           some: {
//             followerId: parent.id
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
    
//     // ✅ NEW: isFollowing resolver - checks if current user is following this user
//     isFollowing: async (parent: User, args: any, ctx: GraphqlContext) => {
//       const currentUserId = ctx.user?.id;
      
//       // Agar user authenticated nahi hai to false return karo
//       if (!currentUserId) return false;
      
//       // Agar same user hai to false (can't follow yourself)
//       if (currentUserId === parent.id) return false;

//       // Check if current user is following this user
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

    // ⚡ OPTIMIZATION: Single upsert instead of find + create + find
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        // Update profile image if changed
        profileImageUrl: data.picture
      },
      create: {
        email: data.email,
        firstName: data.given_name ?? "",
        lastName: data.family_name ?? "",
        profileImageUrl: data.picture
      }
    });

    // ⚡ OPTIMIZATION: Cache user data for 10 minutes
    await redisClient.setex(`USER:${user.id}`, 600, JSON.stringify(user));

    const userToken = JWTService.generateTokenForUser(user);
    return userToken;
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;

    // ⚡ OPTIMIZATION: Check cache first
    const cacheKey = `USER:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const user = await prisma.user.findUnique({ where: { id } });
    
    if (user) {
      // Cache for 10 minutes
      await redisClient.setex(cacheKey, 600, JSON.stringify(user));
    }

    return user;
  },

  suggestedUsers: async (parent: any, args: any, ctx: GraphqlContext) => {
    const currentUserId = ctx.user?.id;
    if (!currentUserId) throw new Error("User not authenticated!");

    // ⚡ OPTIMIZATION: Added TTL to cache (5 minutes)
    const cacheKey = `RECOMMENDED_USERS:${currentUserId}`;
    const cachedValue = await redisClient.get(cacheKey);
    if (cachedValue) return JSON.parse(cachedValue);

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
      take: 10,
      // ⚡ OPTIMIZATION: Select only needed fields
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImageUrl: true
      }
    });

    // Cache for 5 minutes
    await redisClient.setex(cacheKey, 300, JSON.stringify(users));
    return users;
  },

  getUser: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
    // ⚡ OPTIMIZATION: Check cache first
    const cacheKey = `USER:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) throw new Error("User not found!");

    // Cache for 10 minutes
    await redisClient.setex(cacheKey, 600, JSON.stringify(user));
    return user;
  },
}

const mutations = {
  followUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
    const followerId = ctx.user?.id;
    if (!followerId) throw new Error("User not authenticated!");

    if (followerId === followingId) {
      throw new Error("You cannot follow yourself!");
    }

    // ⚡ OPTIMIZATION: Check user exists and not already following in one query
    const [userToFollow, alreadyFollowing] = await Promise.all([
      prisma.user.findUnique({ where: { id: followingId } }),
      prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId
          }
        }
      })
    ]);

    if (!userToFollow) throw new Error("User to follow not found!");
    if (alreadyFollowing) throw new Error("You are already following this user!");

    // Create follow relationship
    await prisma.follows.create({
      data: {
        followerId,
        followingId
      }
    });

    // ⚡ OPTIMIZATION: Invalidate relevant caches in parallel
    await Promise.all([
      redisClient.del(`RECOMMENDED_USERS:${followerId}`),
      redisClient.del(`USER_FOLLOWING:${followerId}`),
      redisClient.del(`USER_FOLLOWERS:${followingId}`),
      redisClient.del(`FOLLOW_STATUS:${followerId}:${followingId}`)
    ]);

    return {
      success: true,
      message: `Successfully followed ${userToFollow.firstName}!`,
      user: userToFollow
    };
  },

  unfollowUser: async (parent: any, { followingId }: { followingId: string }, ctx: GraphqlContext) => {
    const followerId = ctx.user?.id;
    if (!followerId) throw new Error("User not authenticated!");

    // ⚡ OPTIMIZATION: Check user exists and is following in one query
    const [userToUnfollow, isFollowing] = await Promise.all([
      prisma.user.findUnique({ where: { id: followingId } }),
      prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId
          }
        }
      })
    ]);

    if (!userToUnfollow) throw new Error("User to unfollow not found!");
    if (!isFollowing) throw new Error("You are not following this user!");

    // Delete follow relationship
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    // ⚡ OPTIMIZATION: Invalidate relevant caches in parallel
    await Promise.all([
      redisClient.del(`RECOMMENDED_USERS:${followerId}`),
      redisClient.del(`USER_FOLLOWING:${followerId}`),
      redisClient.del(`USER_FOLLOWERS:${followingId}`),
      redisClient.del(`FOLLOW_STATUS:${followerId}:${followingId}`)
    ]);

    return {
      success: true,
      message: `Successfully unfollowed ${userToUnfollow.firstName}!`,
      user: userToUnfollow
    };
  }
}

const extraResolvers = {
  User: {
    tweets: async (parent: User) => {
      // ⚡ OPTIMIZATION: Check if already loaded
      if ((parent as any).tweets) return (parent as any).tweets;

      const cacheKey = `USER_TWEETS:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const tweets = await prisma.tweet.findMany({ 
        where: { authorId: parent.id },
        orderBy: { createdAt: "desc" }
      });

      await redisClient.setex(cacheKey, 300, JSON.stringify(tweets)); // 5 min cache
      return tweets;
    },

    followers: async (parent: User) => {
      // ⚡ OPTIMIZATION: Check if already loaded
      if ((parent as any).followers) return (parent as any).followers;

      const cacheKey = `USER_FOLLOWERS:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const followers = await prisma.user.findMany({
        where: {
          followers: {
            some: {
              followingId: parent.id
            }
          }
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true
        }
      });

      await redisClient.setex(cacheKey, 300, JSON.stringify(followers)); // 5 min cache
      return followers;
    },

    following: async (parent: User) => {
      // ⚡ OPTIMIZATION: Check if already loaded
      if ((parent as any).following) return (parent as any).following;

      const cacheKey = `USER_FOLLOWING:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const following = await prisma.user.findMany({
        where: {
          following: {
            some: {
              followerId: parent.id
            }
          }
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true
        }
      });

      await redisClient.setex(cacheKey, 300, JSON.stringify(following)); // 5 min cache
      return following;
    },

    followerCount: async (parent: User) => {
      // ⚡ OPTIMIZATION: Check if already loaded
      if ((parent as any).followerCount !== undefined) return (parent as any).followerCount;

      const cacheKey = `USER_FOLLOWER_COUNT:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return parseInt(cached);

      const count = await prisma.follows.count({
        where: { followingId: parent.id }
      });

      await redisClient.setex(cacheKey, 600, count.toString()); // 10 min cache
      return count;
    },

    followingCount: async (parent: User) => {
      // ⚡ OPTIMIZATION: Check if already loaded
      if ((parent as any).followingCount !== undefined) return (parent as any).followingCount;

      const cacheKey = `USER_FOLLOWING_COUNT:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return parseInt(cached);

      const count = await prisma.follows.count({
        where: { followerId: parent.id }
      });

      await redisClient.setex(cacheKey, 600, count.toString()); // 10 min cache
      return count;
    },

    isFollowing: async (parent: User, args: any, ctx: GraphqlContext) => {
      const currentUserId = ctx.user?.id;

      if (!currentUserId) return false;
      if (currentUserId === parent.id) return false;

      // ⚡ OPTIMIZATION: Cache follow status
      const cacheKey = `FOLLOW_STATUS:${currentUserId}:${parent.id}`;
      const cached = await redisClient.get(cacheKey);
      if (cached !== null) return cached === "1";

      const isFollowing = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: parent.id
          }
        }
      });

      const result = !!isFollowing;
      await redisClient.setex(cacheKey, 600, result ? "1" : "0"); // 10 min cache
      return result;
    }
  }
}

export const resolvers = { queries, mutations, extraResolvers }