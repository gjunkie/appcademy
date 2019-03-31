import Boom from 'boom';

const createArtist = request => (
  new Promise((resolve) => {
    const ArtistModel = request.server.plugins.db.Artist;
    const { category, artist } = request.payload;

    const artistData = {
      ...artist,
      entityId: artist.id.toString(),
      nominations: [
        category.name,
      ],
      profilePath: artist.poster_path,
    };

    ArtistModel.create(artistData, (err, newArtist) => {
      if (err) {
        const error = Boom.badRequest('Invalid query');
        error.output.payload.info = error;
        resolve(error);
      }

      newArtist.save(() => {
        resolve(newArtist);
      });
    });
  })
);

const addArtist = request => (
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

        if (artist) {
          const error = Boom.badRequest('Artist already exists');
          error.output.payload.info = error;
          resolve(error);
          return;
        }

        createArtist(request).then((newArtist) => {
          resolve(newArtist);
        });
      });
  })
);

export default addArtist;
