import Boom from 'boom';
import shortid from 'shortid';

const generateGame = (creator, request) => (
  new Promise((resolve) => {
    const GameModel = request.server.plugins.db.Game;
    const gameData = {
      inviteCode: shortid.generate(),
      creator,
    };

    GameModel.create(gameData, (err, newGame) => {
      if (err) {
        const error = Boom.badRequest('Invalid query');
        error.output.payload.info = error;
        resolve(error);
      }
      newGame.players.push(creator._id);

      newGame.save(() => {
        resolve(newGame);
      });
    });
  })
);

/*
 * Creates a user with the payload sent in the request.
 */
const createGame = request => (
  new Promise((resolve) => {
    const UserModel = request.server.plugins.db.User;

    UserModel.findById(request.payload.id)
      .exec((err, creator) => {
        generateGame(creator, request).then((game) => {
          const lintedGame = {
            id: game._id,
            inviteCode: game.inviteCode,
            name: game.name,
            players: game.players,
          };
          resolve(lintedGame);
        });
      });
  })
);

export default createGame;
