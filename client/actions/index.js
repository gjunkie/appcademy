import createUser from './createUser';
import createGame from './createGame';
import deleteUser from './deleteUser';
import getUser from './getUser';
import getUsers from './getUsers';
import setCurrentUser from './setCurrentUser';
import loadUser from './loadUser';
import loadUsers from './loadUsers';
import login from './login';
import logout from './logout';
import removeUser from './removeUser';

const actions = {
  createUser,
  createGame,
  deleteUser,
  getUser,
  getUsers,
  setCurrentUser,
  loadUser,
  loadUsers,
  login,
  logout,
  removeUser,
};

export default actions;
