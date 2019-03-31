
import Boom from 'boom';

const updateArtist = request => (
  new Promise((resolve) => {
    const ArtistModel = request.server.plugins.db.Artist;

    ArtistModel.findOne({ name: request.payload.artist.name })
      .exec((err, artist) => {
        if (err) {
          const error = Boom.badRequest('Invalid query');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        if (!artist) {
          const error = Boom.badRequest('Artist does not exist');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        if (artist.nominations.includes(request.payload.category.name)) {
          const error = Boom.badRequest('Artist already in category');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        artist.nominations.push(request.payload.category.name);

        artist.save(() => {
          resolve(artist);
        });
      });
  })
);

export default updateArtist;
