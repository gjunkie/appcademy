import Hapi from 'hapi';
import mongo from 'mongodb';
import api from './api';
import auth from './auth';
import www from './www';
import db from '../db';

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
  await server.register([
    { plugin: auth },
    { plugin: api },
    { plugin: www },
    {
      plugin: db,
      options: {
        url: process.env.MONGODB_URL || 'mongodb://database:27017/appcademydb',
      },
    },
  ]);

  await server.start().then(() => {
    console.log('API server started!');
  });
}

setupAndStart();
