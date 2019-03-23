import axios from 'axios';
import loadUser from '../loadUser';

export const getUser = options => dispatch => (
  axios
    .get('/api/getuser', { params: { id: options.id } })
    .then((response) => {
      dispatch(loadUser(response.data));
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    })
);

export default getUser;
