// Create all of your GET handlers in this folder, then import
// and export them here.
import games from './games';
import nominees from './nominees';
import user from './user';
import users from './users';

const routes = {
  games,
  nominees,
  user,
  users,
};

export default routes;
