import Boom from 'boom';

const findGame = request => (
  new Promise((resolve) => {
    const GameModel = request.server.plugins.db.Game;
    GameModel.findOne({ inviteCode: request.payload.inviteCode })
      .exec((err, game) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
        }
        resolve(game);
      });
  })
);

const findGames = (request, gameIds) => (
  new Promise((resolve) => {
    const GameModel = request.server.plugins.db.Game;
    GameModel.find({
      '_id': { $in: gameIds },
    }, (error, games) => {
      if (!games) {
        resolve({});
      }

      const lintedGames = games.map(game => ({
        creator: game.creator,
        id: game._id,
        inviteCode: game.inviteCode,
        name: game.name,
        players: game.players,
      }));

      resolve(lintedGames);
    });
  })
);

const findUser = request => (
  new Promise((resolve) => {
    const UserModel = request.server.plugins.db.User;
    UserModel.findById(request.payload.userId)
      .exec((err, user) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
        }
        resolve(user);
      });
  })
);

const findEntities = request => (
  Promise.all([
    findUser(request),
    findGame(request),
  ]).then(([user, game]) => ({
    user,
    game,
  }))
);

const saveEntities = (user, game) => (
  Promise.all([
    user.save(),
    game.save(),
  ]).then(([savedUser, savedGame]) => ({
    user: savedUser,
    game: savedGame,
  }))
);

/*
 * Creates a user with the payload sent in the request.
 */
const joinGame = request => (
  new Promise((resolve) => {
    findEntities(request).then(({ user, game }) => {
      const inGame = user.games.includes(game._id);

      if (inGame) {
        const error = Boom.badRequest('Already a member');
        resolve(error);
        return;
      }

      game.players.push(user._id);
      user.games.push(game._id);

      saveEntities(user, game).then(() => {
        findGames(request, user.games).then(games => (
          resolve(games)
        ));
      });
    });
  })
);

export default joinGame;
