import mongoose from 'mongoose';

import requireAll from 'require-all';

const models = requireAll({ dirname: `${__dirname}/models` });

const plugin = {
  register: (server, options) => {
    mongoose.connect(options.url);

    const db = mongoose.connection;

    server.expose('connection', db);

    Object.keys(models).forEach((key, value) => {
      server.expose(key, models[key]);
    });
  },
  name: 'db',
};

export default plugin;
