import Hapi from 'hapi';
import dotenv from 'dotenv';
import mongo from 'mongodb';

import api from './api';
import auth from './auth';
import db from '../db';

dotenv.config();

const server = new Hapi.Server({
  port: 8000,
  routes: {
    cors: {
      origin: ['http://0.0.0.0:8080', 'http://0.0.0.0:8081'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language'],
    },
  },
});

async function setupAndStart() {
  server.app.AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

  await server.register([
    {
      plugin: auth,
      options: {
        secret: process.env.AUTH_SECRET_KEY,
      },
    },
    { plugin: api },
    {
      plugin: db,
      options: {
        url: process.env.MONGODB_URL || 'mongodb://database:27017/appcademydb',
      },
    },
  ]);

  await server.start().then(() => {
    console.log('API server started!'); // eslint-disable-line no-console
  });
}

setupAndStart();
