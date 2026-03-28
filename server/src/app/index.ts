import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";
import { prisma } from '../prismaClient';
import { User } from './user';

export async function initServer(): Promise<express.Express> {
    const app = express();
    app.use(bodyParser.json())
    const graphqlServer = new ApolloServer({
        typeDefs: `
            ${User.types}
            type Query{
                ${User.queries}
            }
        `,
        resolvers: {
            Query: {
                // sayHello: () => `Hello from GraphQL server`
                ...User.resolvers.queries
            }
        },
    });

    
    
    await graphqlServer.start();

    app.use(cors());
    app.use(express.json());

    app.use("/graphql", expressMiddleware(graphqlServer));

    return app;
}