const mongoose = require('mongoose');
const _ = require('lodash');
const models = require('require-all')(__dirname + '/models');

exports.register = function(plugin, options, next) {

  mongoose.connect(options.url, function() {
    next();
  });

  const db = mongoose.connection;

  plugin.expose('connection', db);
  _.forIn(models, function(value, key) {
    plugin.expose(key, value);
  });

};

exports.register.attributes = {
  name: 'db'
};
