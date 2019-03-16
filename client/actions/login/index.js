import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import loadCurrentUser from '../loadCurrentUser';

const login = payload => dispatch => (
  axios.post('/api/auth', payload)
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);

      dispatch(loadCurrentUser(jwt.decode(token)));
    })
);

export default login;
