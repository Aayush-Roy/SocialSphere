import { prisma } from "../../prismaClient";
import { GraphqlContext } from "../../interfaces";
import { Tweet } from "@prisma/client";
import { redisClient } from "../../redis";

interface CreateTweetPayLoad{
    content:string;
    imageUrl?:string;
}

const queries = {
    getAllTweets: async () => {
        const cachedTweets=await redisClient.get("ALL-TWEETS")
        if(cachedTweets) return JSON.parse(cachedTweets)
        const tweets = await prisma.tweet.findMany({
            orderBy: { createdAt: "desc" }
        });
        await redisClient.set(`ALL-TWEETS`,JSON.stringify(tweets));
        return tweets;
    }
};
const mutations ={
    createTweet:async(parent:any,{payload}:{payload:CreateTweetPayLoad},ctx:GraphqlContext)=>{
       
        if(!ctx.user) throw new Error("you are not authenticated")
        const rateLimitingFlag = await redisClient.get(`RATE-LIMIT:TWEET:${ctx.user.id}`)
        if(rateLimitingFlag) throw new Error("Please wait...")
        const tweet = await prisma.tweet.create({
            data:{
                content:payload.content,
                imageUrl:payload.imageUrl || null,
                author:{connect:{id:ctx.user.id}}
            }
        })
        await redisClient.setex(`RATE-LIMIT:TWEET:${ctx.user.id}`,10,1)
        await redisClient.del("ALL-TWEETS");
        return tweet;
    }
}
const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) => prisma.user.findUnique({where:{id:parent.authorId}})
  },
};
export const resolvers = {mutations,extraResolvers, queries}