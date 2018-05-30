const Hapi = require('hapi');
const mongo = require('mongodb');
const uuidv4 = require('uuid/v4');

const server = new Hapi.Server({
  port: 8000,
  routes: {
    cors: {
      origin: ['http://0.0.0.0:8080', 'http://0.0.0.0:8081'],
      headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
    }
  }
});

async function setupAndStart() {
  await server.register([
    { plugin: require('bell') },
    { plugin: require('hapi-auth-cookie') },
    { plugin: require('./api/') },
    {
      plugin: require('./db'),
      options: {
          url: process.env.MONGODB_URL || 'mongodb://database:27017/appcademy',
      }
    }
  ]);

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'password-should-be-32-characters',
    isSecure: false,
    //clientId: process.env.googleClientId,
    //clientSecret: process.env.googleClientSecret,
    providerParams: {
      redirect_uri: server.info.uri + '/api/login'
    }
  });

  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', {
    password: 'password-should-be-32-characters',
    cookie: 'appcademy',
    redirectTo: '/api/login',
    isSecure: false,
    validateFunc: async (request, session) => {
      const cached = await cache.get(session.sid);
      const out = {
          valid: !!cached
      };

      if (out.valid) {
          out.credentials = cached.account;
      }

      return out;
    }
  });

  server.route({
    method: ['GET', 'POST'],
    path: '/api/login',
    config: {
      auth: 'google',
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: async (request, h) => {
        if (!request.auth.isAuthenticated) {
          reject(request.auth.error.message);
          return `Authentication failed due to: ${request.auth.error.message}`;
        }
        const loginPromise = await request.server.plugins.api.get(request, '/api/user/login');
        const account = await loginPromise;
        const sid = uuidv4();

        console.log(request.server.app)
        await request.server.app.cache.set(sid, { account }, 0);
        request.cookieAuth.set({ sid });

        //request.auth.credentials.timestamp = new Date();
        //request.auth.session.set(request.auth.credentials);
        return h.redirect('/');
      }
    }
  });

  await server.start().then(() => {
    console.log('API server started!');
  });
};

setupAndStart();
