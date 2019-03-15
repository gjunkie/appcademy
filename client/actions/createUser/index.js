import axios from 'axios';

export const createUser = params => dispatch => {
  return axios.post('/api/createuser', params).then((response) => {
    console.log(response);
    // dispatch(loadUser(response.data));
  });
};

export default createUser;
