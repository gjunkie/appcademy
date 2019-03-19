import shortid from 'shortid';

/*
 * Creates a user with the payload sent in the request.
 */
const game = request => (
  new Promise((resolve) => {
    const gameData = {
      inviteCode: shortid.generate(),
    };

    const GameModel = request.server.plugins.db.Game;
    GameModel.create(gameData, (err, newGame) => {
      console.log({newGame});
      resolve(newGame);
    });
  })
);

export default game;
