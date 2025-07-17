import './config.js';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connect as connectToDB } from './database/init.js';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

import Preferences from './database/models/preferences.js';

async function startServer() {
  await connectToDB();

  const prefs = await loadPrefs();

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(express.json());

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apollo.start();

  app.post(
    '/graphql',
    express.json(),
    expressMiddleware(apollo, { context: async ({ req }) => ({ req, prefs }) })
  );

  app.get('/health', (req, res) => res.sendStatus(200));

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
  });
}

async function loadPrefs() {
  const prefs = await Preferences.findById('singleton');
  return prefs || (await Preferences.create({ _id: 'singleton' }));
}

startServer().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
