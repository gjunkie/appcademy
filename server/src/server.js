const Hapi = require('hapi');
const mongo = require('mongodb');

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
    { plugin: require('./api/') },
    {
      plugin: require('./db'),
      options: {
          url: process.env.MONGODB_URL || 'mongodb://database:27017/appcademy',
      }
    }
  ]);

  //server.auth.strategy('google', 'bell', {
    //provider: 'google',
    //password: 'password',
    //isSecure: false,
    //clientId: "222",
    ////clientId: process.env.googleClientId,
    //clientSecret: "111",
    ////clientSecret: process.env.googleClientSecret,
    //providerParams: {
      //redirect_uri: server.info.uri + '/login'
    //}
  //});

  //server.route({
    //method: '*',
    //path: '/login/gmail',
    //config: {
      //auth: 'google',
      //plugins: {
        //'hapi-auth-cookie': {
          //redirectTo: false
        //}
      //},
      //handler: function (request, reply) {
        //console.log('hit login route');
        //request.auth.credentials.timestamp = new Date();
        //request.auth.session.set(request.auth.credentials);
        //request.server.plugins.api.get(request, '/api/user/login', function(response){
          //return reply.redirect('/');
        //});
      //}
    //}
  //});

  await server.start().then(() => {
    console.log('API server started!');
  });
};

setupAndStart();
