import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import setCurrentUser from '../setCurrentUser';

const updateUser = params => dispatch => (
  axios.patch('/api/user', params)
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);

      dispatch(setCurrentUser(jwt.decode(token)));
    })
);

export default updateUser;
