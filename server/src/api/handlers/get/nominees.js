import Boom from 'boom';

const getArtists = request => (
  new Promise(resolve => (
    request.server.plugins.db.Artist
      .find({})
      .exec((err, artists) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
        }

        resolve(artists);
      })
  ))
);

const getFilms = request => (
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

const getNominees = request => (
  new Promise((resolve) => {
    getFilms(request).then((films) => {
      const first = [].concat(films);
      getArtists(request).then((artists) => {
        const nominees = first.concat(artists);
        resolve(nominees);
      });
    });
  })
);

export default getNominees;
