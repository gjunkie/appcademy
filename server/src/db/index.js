const mongoose = require('mongoose');
const _ = require('lodash');
const models = require('require-all')(__dirname + '/models');

exports.plugin = {
  register: async (plugin, options) => {

    mongoose.connect(options.url);

    const db = mongoose.connection;

    plugin.expose('connection', db);
    _.forIn(models, (value, key) => {
      plugin.expose(key, value);
    });
  },
  name: 'db'
}
