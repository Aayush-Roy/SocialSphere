import { User } from "@prisma/client";
import { prisma } from "../../prismaClient";
import JWT from "jsonwebtoken"
const JWT_SECRET="$jhystr782364ruwei"
class JWTService{
    public static  generateTokenForUser(user:User){
        // const user = await prisma.user.findUnique({where:{id:userId}})
        const payload = {
            id:user?.id,
            email:user?.email
        };
        const token = JWT.sign(payload,JWT_SECRET)
        return token;
    }

}

export default JWTService;