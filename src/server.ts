import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './utils/auth.js';
import cors from 'cors';

import { typeDefs, resolvers } from './schemas/index.js'; //Create this folder
import db from './config/connections.js';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const connection_db = async () => {
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  
app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

await connection_db();
await startApolloServer();

