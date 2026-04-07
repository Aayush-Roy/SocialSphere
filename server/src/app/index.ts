// import express from 'express';
// import cors from 'cors';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@as-integrations/express5';
// import bodyParser from "body-parser";
// import { prisma } from '../prismaClient';
// import { User } from './user';
// import { Tweet } from "./tweet";
// import { GraphqlContext } from '../interfaces';
// import JWTService from './services/jwt';
// import uploadRoute from "../routes/upload"

// export async function initServer(): Promise<express.Express> {
//     const app = express();
//      app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
//     app.use(bodyParser.json())
//      app.use("/api", uploadRoute);
//     const graphqlServer = new ApolloServer<GraphqlContext>({
//         typeDefs: `
//             ${User.types}
//             ${Tweet.types}
//             type Query{
//                 ${User.queries}
//                 ${Tweet.queries}
//             }

//             type Mutation{
//                 ${Tweet.muatations}
//             }
//         `,
//         resolvers: {
//             Query: {
//                 // sayHello: () => `Hello from GraphQL server`
//                 ...User.resolvers.queries,
//                 ...Tweet.resolvers.queries
//             },
//             Mutation: {
//             ...Tweet.resolvers.mutations,
       
//       },
//       ...Tweet.resolvers.extraResolvers,
//       ...User.resolvers.extraResolvers,
//         },

// // }
//     });

    
    
//     await graphqlServer.start();
   
//     // app.use(cors());
   
//     app.use(express.json());

//     app.use("/graphql", expressMiddleware(graphqlServer,{context:async({req,res})=>{
//         return {user:req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]) : undefined}
//     }}));

//     return app;
// }

import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";
import { prisma } from '../prismaClient';
import { User } from './user';
import { Tweet } from "./tweet";
import { GraphqlContext } from '../interfaces';
import JWTService from './services/jwt';
import uploadRoute from "../routes/upload"

export async function initServer(): Promise<express.Express> {
    const app = express();
    app.use(
        cors({
            origin: ["http://localhost:3000",
                "https://social-sphere-5q8e.vercel.app",
            ],
            credentials: true,
        })
    );
    app.use(bodyParser.json())
    app.use("/api", uploadRoute);

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${User.types}
            ${Tweet.types}
            
            type Query {
                ${User.queries}
                ${Tweet.queries}
            }

            type Mutation {
                ${User.mutations}
                ${Tweet.muatations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Tweet.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Tweet.resolvers.mutations,
            },
            ...Tweet.resolvers.extraResolvers,
            ...User.resolvers.extraResolvers,
        },
    });

    await graphqlServer.start();
    app.use(express.json());

    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => {
            return {
                user: req.headers.authorization 
                    ? JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]) 
                    : undefined
            }
        }
    }));

    return app;
}