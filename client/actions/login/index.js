import axios from 'axios'

export const login = payload => dispatch => {
  return axios.post('/api/auth', {
    identifier: payload.identifier,
    password: payload.password,
  });
};

export default login;
