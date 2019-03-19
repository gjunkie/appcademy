import axios from 'axios';
import removeUser from '../removeUser';

const deleteUser = id => (dispatch) => {
  axios.delete(`/api/deleteuser/${id}`).then(() => {
    dispatch(removeUser(id));
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
  });
};

export default deleteUser;
