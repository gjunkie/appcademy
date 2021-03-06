// list your api endpoints with their handlers here.
import handlers from './handlers';

const plugin = {
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/api/getuser',
        config: {
          auth: 'token',
          handler: handlers.get.user,
        },
      },
      {
        method: 'GET',
        path: '/api/getusers',
        config: {
          auth: 'token',
          handler: handlers.get.users,
        },
      },
      {
        method: 'GET',
        path: '/api/mygames',
        config: {
          auth: 'token',
          handler: handlers.get.games,
        },
      },
      {
        method: 'GET',
        path: '/api/nominees',
        config: {
          auth: 'token',
          handler: handlers.get.nominees,
        },
      },
      {
        method: 'PATCH',
        path: '/api/artist',
        config: {
          auth: 'token',
          handler: handlers.patch.artist,
        },
      },
      {
        method: 'PATCH',
        path: '/api/film',
        config: {
          auth: 'token',
          handler: handlers.patch.film,
        },
      },
      {
        method: 'PATCH',
        path: '/api/user',
        config: {
          auth: 'token',
          handler: handlers.patch.user,
        },
      },
      {
        method: 'POST',
        path: '/api/artist',
        config: {
          auth: 'token',
          handler: handlers.post.artist,
        },
      },
      {
        method: 'POST',
        path: '/api/auth',
        config: {
          auth: false,
          handler: handlers.post.auth,
        },
      },
      {
        method: 'POST',
        path: '/api/film',
        config: {
          auth: 'token',
          handler: handlers.post.film,
        },
      },
      {
        method: 'POST',
        path: '/api/game',
        config: {
          auth: 'token',
          handler: handlers.post.game,
        },
      },
      {
        method: 'POST',
        path: '/api/joingame',
        config: {
          auth: 'token',
          handler: handlers.post.joinGame,
        },
      },
      {
        method: 'POST',
        path: '/api/signup',
        config: {
          auth: false,
          handler: handlers.post.signUp,
        },
      },
      {
        method: 'DELETE',
        path: '/api/deleteuser/{id}',
        config: {
          auth: 'token',
          handler: handlers.delete.user,
        },
      },
    ]);
  },
  name: 'api',
};

export default plugin;
