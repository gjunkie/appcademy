import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import setCurrentUser from '../setCurrentUser';

const login = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export default login;
