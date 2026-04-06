import { prisma } from "../../prismaClient";
import { GraphqlContext } from "../../interfaces";
import { Tweet } from "@prisma/client";

interface CreateTweetPayLoad{
    content:string;
    imageUrl?:string;
}
// const queries = {
//     getAllTweets:()=>{
//         prisma.tweet.findMany({orderBy:{createdAt:"desc"}})
//     }
// }
const queries = {
    getAllTweets: async () => {
        return await prisma.tweet.findMany({
            orderBy: { createdAt: "desc" }
        });
    }
};
const mutations ={
    createTweet:async(parent:any,{payload}:{payload:CreateTweetPayLoad},ctx:GraphqlContext)=>{
        if(!ctx.user) throw new Error("you are not authenticated")
        const tweet = await prisma.tweet.create({
            data:{
                content:payload.content,
                imageUrl:payload.imageUrl || null,
                author:{connect:{id:ctx.user.id}}
            }
        })
        return tweet;
    }
}
const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) => prisma.user.findUnique({where:{id:parent.authorId}})
  },
};
export const resolvers = {mutations,extraResolvers, queries}