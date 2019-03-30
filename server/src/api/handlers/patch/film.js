import Boom from 'boom';

/*
 * Creates a user with the payload sent in the request.
 */
const updateFilm = request => (
  new Promise((resolve) => {
    const FilmModel = request.server.plugins.db.Film;

    FilmModel.findOne({ title: request.payload.film.title })
      .exec((err, film) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        if (!film) {
          const error = Boom.badRequest('Film does not exist');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        if (film.nominations.includes(request.payload.category.name)) {
          const error = Boom.badRequest('Film already in category');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        film.nominations.push(request.payload.category.name);

        film.save(() => {
          resolve(film);
        });
      });
  })
);

export default updateFilm;
