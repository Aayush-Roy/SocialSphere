// import { prisma } from "../../prismaClient";
// import { GraphqlContext } from "../../interfaces";
// import { Tweet } from "@prisma/client";
// import { redisClient } from "../../redis";

// interface CreateTweetPayLoad{
//     content:string;
//     imageUrl?:string;
// }

// const queries = {
//     getAllTweets: async () => {
//         const cachedTweets=await redisClient.get("ALL-TWEETS")
//         if(cachedTweets) return JSON.parse(cachedTweets)
//         const tweets = await prisma.tweet.findMany({
//             orderBy: { createdAt: "desc" }
//         });
//         await redisClient.set(`ALL-TWEETS`,JSON.stringify(tweets));
//         return tweets;
//     }
// };
// const mutations ={
//     createTweet:async(parent:any,{payload}:{payload:CreateTweetPayLoad},ctx:GraphqlContext)=>{
       
//         if(!ctx.user) throw new Error("you are not authenticated")
//         const rateLimitingFlag = await redisClient.get(`RATE-LIMIT:TWEET:${ctx.user.id}`)
//         if(rateLimitingFlag) throw new Error("Please wait...")
//         const tweet = await prisma.tweet.create({
//             data:{
//                 content:payload.content,
//                 imageUrl:payload.imageUrl || null,
//                 author:{connect:{id:ctx.user.id}}
//             }
//         })
//         await redisClient.setex(`RATE-LIMIT:TWEET:${ctx.user.id}`,10,1)
//         await redisClient.del("ALL-TWEETS");
//         return tweet;
//     }
// }
// const extraResolvers = {
//   Tweet: {
//     author: (parent: Tweet) => prisma.user.findUnique({where:{id:parent.authorId}})
//   },
// };
// export const resolvers = {mutations,extraResolvers, queries}

import { prisma } from "../../prismaClient";
import { GraphqlContext } from "../../interfaces";
import { Tweet } from "@prisma/client";
import { redisClient } from "../../redis";

interface CreateTweetPayLoad {
    content: string;
    imageUrl?: string;
}

const queries = {
    getAllTweets: async () => {
        const cacheKey = "ALL-TWEETS";
        
        // Try cache first
        const cachedTweets = await redisClient.get(cacheKey);
        if (cachedTweets) {
            return JSON.parse(cachedTweets);
        }

        // ⚡ OPTIMIZATION: Include author in single query (fixes N+1 problem)
        const tweets = await prisma.tweet.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profileImageUrl: true
                    }
                }
            }
        });

        // Cache for 60 seconds
        await redisClient.setex(cacheKey, 60, JSON.stringify(tweets));
        
        return tweets;
    }
};

const mutations = {
    createTweet: async (
        parent: any, 
        { payload }: { payload: CreateTweetPayLoad }, 
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authenticated");

        // Rate limiting check
        const rateLimitKey = `RATE-LIMIT:TWEET:${ctx.user.id}`;
        const rateLimitingFlag = await redisClient.get(rateLimitKey);
        if (rateLimitingFlag) throw new Error("Please wait 10 seconds before posting again");

        // ⚡ OPTIMIZATION: Include author in create response
        const tweet = await prisma.tweet.create({
            data: {
                content: payload.content,
                imageUrl: payload.imageUrl || null,
                author: { connect: { id: ctx.user.id } }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profileImageUrl: true
                    }
                }
            }
        });

        // Set rate limit (10 seconds)
        await redisClient.setex(rateLimitKey, 10, "1");

        // ⚡ OPTIMIZATION: Smart cache invalidation
        await redisClient.del("ALL-TWEETS");

        return tweet;
    }
};

const extraResolvers = {
    Tweet: {
        author: async (parent: Tweet) => {
            // ⚡ OPTIMIZATION: If author already loaded, return it (avoid extra query)
            if ((parent as any).author) {
                return (parent as any).author;
            }

            // ⚡ OPTIMIZATION: Cache individual users
            const cacheKey = `USER:${parent.authorId}`;
            const cached = await redisClient.get(cacheKey);
            if (cached) return JSON.parse(cached);

            const user = await prisma.user.findUnique({
                where: { id: parent.authorId },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImageUrl: true
                }
            });

            if (user) {
                // Cache user for 5 minutes
                await redisClient.setex(cacheKey, 300, JSON.stringify(user));
            }

            return user;
        }
    }
};

export const resolvers = { mutations, extraResolvers, queries };