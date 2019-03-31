import Boom from 'boom';

const createFilm = request => (
  new Promise((resolve) => {
    const FilmModel = request.server.plugins.db.Film;
    const { category, film } = request.payload;

    const filmData = {
      ...film,
      entityId: film.id.toString(),
      nominations: [
        category.name,
      ],
      posterPath: film.poster_path,
    };

    FilmModel.create(filmData, (err, newFilm) => {
      if (err) {
        const error = Boom.badRequest('Invalid query');
        error.output.payload.info = error;
        resolve(error);
      }

      newFilm.save(() => {
        resolve(newFilm);
      });
    });
  })
);

const addFilm = request => (
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

        if (film) {
          const error = Boom.badRequest('Film already exists');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        createFilm(request).then((newFilm) => {
          resolve(newFilm);
        });
      });
  })
);

export default addFilm;
