import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import setCurrentUser from '../setCurrentUser';
// import loadUser from '../loadUser';

const updateUser = params => dispatch => (
  axios.patch('/api/user', params)
    .then((res) => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);

      // dispatch(loadUser(response.data));
      console.log(jwt.decode(token));
      console.log(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
);

export default updateUser;
