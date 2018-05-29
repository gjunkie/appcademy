// Create all of your GET handlers in this folder, then import
// and export them here.
const login = require('./login');
const user = require('./user');
const users = require('./users');

module.exports = {
  login,
  user,
  users,
};
