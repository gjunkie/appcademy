import axios from 'axios';
import loadUsers from '../loadUsers';

const getUsers = () => dispatch => (
  axios.get('/api/getusers')
    .then((response) => {
      dispatch(loadUsers(response.data));
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    })
);

export default getUsers;
