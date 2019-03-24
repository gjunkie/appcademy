const getGames = request => (
  new Promise((resolve) => {
    const UserModel = request.server.plugins.db.User;
    const GameModel = request.server.plugins.db.Game;
    const { userId } = request.query;

    UserModel.findById(userId).exec((err, user) => {
      const gameIds = user.games;

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
    });
  })
);

export default getGames;
