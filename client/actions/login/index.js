import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import setCurrentUser from '../setCurrentUser';

const login = payload => dispatch => (
  axios.post('/api/auth', payload)
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);

      dispatch(setCurrentUser(jwt.decode(token)));
    })
);

export default login;
