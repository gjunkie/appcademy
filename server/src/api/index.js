// list your api endpoints with their handlers here.
// look at ./handlers/get and ./handlers/post to see sample handlers.
import requestHandlers from './handlers';

const plugin = {
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/api/getuser',
        config: {
          auth: 'token',
          handler: requestHandlers.get.user,
        },
      },
      {
        method: 'GET',
        path: '/api/getusers',
        config: {
          auth: 'token',
          handler: requestHandlers.get.users,
        },
      },
      {
        method: 'POST',
        path: '/api/createuser',
        config: {
          auth: false,
          handler: requestHandlers.post.user,
        },
      },
      {
        method: 'POST',
        path: '/api/auth',
        config: {
          auth: false,
          handler: requestHandlers.post.auth,
        },
      },
      {
        method: 'DELETE',
        path: '/api/deleteuser/{id}',
        config: {
          auth: 'token',
          handler: requestHandlers.delete.user,
        },
      },
    ]);
  },
  name: 'api',
};

export default plugin;
