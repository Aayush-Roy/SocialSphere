import axios from "axios"
import { prisma } from "../../prismaClient";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { Tweet, User } from "@prisma/client";
 interface GoogleTokenInfo {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string; // Google sometimes string deta hai
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
    verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
        // return token;
        const googleToken = token
        const googleOauthURL = new URL(`https://www.googleapis.com/oauth2/v3/tokeninfo`)
        googleOauthURL.searchParams.set('id_token', googleToken)
        const {data} = await axios.get<GoogleTokenInfo>(googleOauthURL.toString(),{
            responseType:'json'
        })

        const user = await prisma.user.findUnique({where:{email:data.email}})
        if(!user) {
            await prisma.user.create({
                data:{
                    email:data.email,
            
                     firstName: data.given_name ?? "",
                     lastName: data.family_name ?? "",
                    profileImageUrl:data.picture
                }
            })
        }
        const userInDb = await prisma.user.findUnique({where:{email:data.email}});
        if(!userInDb) throw new Error("User with this email not found!");
        const userToken = JWTService.generateTokenForUser(userInDb);
        // console.log(data);
        return userToken;
    },
    getCurrentUser:async(parent:any, args:any,ctx:GraphqlContext)=>{
        console.log(ctx)
        const id = ctx.user?.id;
        if(!id) return null;
        const user = await prisma.user.findUnique({where:{
            id:id
        }})
        return user;
    }
}

const extraResolvers = {

    User:{
        tweets:(parent:User)=>prisma.tweet.findMany({where:{author:{id:parent.id}}})
    }

}

export const resolvers = {queries,extraResolvers}