import axios from 'axios';
// import Validator from 'validator';

export const createUser = params => dispatch => {
  console.log(params)
  // const { errors, isValid } = validateInput(params)
  return axios.post('/api/createuser', params).then((response) => {
    console.log(response);
    // dispatch(loadUser(response.data));
  })
};

export default createUser;
