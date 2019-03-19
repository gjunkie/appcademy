import axios from 'axios';

const createUser = params => dispatch => {
  return axios.post('/api/signup', params).then((response) => {
    console.log(response); // eslint-disable-line no-console
    // dispatch(loadUser(response.data));
  });
};

export default createUser;
