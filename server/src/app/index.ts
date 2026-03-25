import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

export async function initServer(): Promise<express.Express> {
    const app = express();

    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                sayHello: String!
            }
        `,
        resolvers: {
            Query: {
                sayHello: () => `Hello from GraphQL server`
            }
        },
    });

    await graphqlServer.start();

    app.use(cors());
    app.use(express.json());

    app.use("/graphql", expressMiddleware(graphqlServer));

    return app;
}