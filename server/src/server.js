'use strict';

const Hapi = require('hapi');
const mongo = require('mongodb');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
    host: 'localhost',
    port: 8000,
    routes: {
      cors: {
        origin: ['http://localhost:8080', 'http://localhost:8081'],
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
      }
    }
});


server.register([

  { register: require('./api/') },
  { register: require('./db/'), options: { url: process.env.MONGODB_URL || 'mongodb://localhost:27017/oscars' } },

], (err) => {
    if (err) {
      throw err;
    }

    // Start the server
    server.start((err) => {
      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  }
);

