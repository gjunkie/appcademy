import Hapi from 'hapi';

// Get users
module.exports = (request, h) => {
  console.log('You hit the get all users endpoint!')
  const users = request.server.plugins.db.User.find();
  return users;
};
