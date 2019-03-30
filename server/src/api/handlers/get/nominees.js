import Boom from 'boom';

const getNominees = request => (
  new Promise(resolve => (
    request.server.plugins.db.Film
      .find({})
      .exec((err, films) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
        }

        resolve(films);
      })
  ))
);

export default getNominees;
