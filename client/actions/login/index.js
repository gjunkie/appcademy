import axios from 'axios'

export const login = payload => dispatch => {
  axios.post('/api/login', {
    id: '1',
    name: 'freddie',
    title: 'manager',
  })
  .then((response) => {
    console.log({response})
  }).catch((err) => {
    console.log(err)
  })
};

export default login;
