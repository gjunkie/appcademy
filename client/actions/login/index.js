import axios from 'axios';

const login = payload => dispatch => (
  axios.post('/api/auth', {
    identifier: payload.identifier,
    password: payload.password,
  })
);

export default login;
