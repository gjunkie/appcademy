const getGames = request => (
  new Promise((resolve) => {
    const GameModel = request.server.plugins.db.Game;
    const { userId } = request.query;

    GameModel.find({ creator: userId })
      .exec((err, games) => {
        if (!games) {
          resolve({});
        }
        const lintedGames = games.map(game => ({
          creator: game.creator,
          id: game._id,
          name: game.name,
          players: game.players,
        }));
        resolve(lintedGames);
      });
  })
);

export default getGames;
