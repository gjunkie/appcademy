import createUser from './createUser';
import createGame from './createGame';
import deleteUser from './deleteUser';
import getMyGames from './getMyGames';
import getUser from './getUser';
import getUsers from './getUsers';
import setCurrentUser from './setCurrentUser';
import loadGame from './loadGame';
import loadMyGames from './loadMyGames';
import loadUser from './loadUser';
import loadUsers from './loadUsers';
import login from './login';
import logout from './logout';
import removeUser from './removeUser';

const actions = {
  createUser,
  createGame,
  deleteUser,
  getMyGames,
  getUser,
  getUsers,
  setCurrentUser,
  loadGame,
  loadMyGames,
  loadUser,
  loadUsers,
  login,
  logout,
  removeUser,
};

export default actions;
