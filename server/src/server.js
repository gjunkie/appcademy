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

  { register: require('bell') },
  { register: require('./api/') },
  { register: require('./db/'), options: { url: process.env.MONGODB_URL || 'mongodb://localhost:27017/oscars' } },

], (err) => {
    if (err) {
      throw err;
    }

 server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'password',
    isSecure: false,
    clientId: "222",
    //clientId: process.env.googleClientId,
    clientSecret: "111",
    //clientSecret: process.env.googleClientSecret,
    providerParams: {
      redirect_uri: server.info.uri + '/login'
    }
  });

  server.route({
    method: '*',
    path: '/login/gmail',
    config: {
      auth: 'google',
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: function (request, reply) {
        console.log('hit login route');
        request.auth.credentials.timestamp = new Date();
        request.auth.session.set(request.auth.credentials);
        request.server.plugins.api.get(request, '/api/user/login', function(response){
          return reply.redirect('/');
        });
      }
    }
  });

    // Start the server
    server.start((err) => {
      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  }
);

