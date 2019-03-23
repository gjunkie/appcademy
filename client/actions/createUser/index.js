import axios from 'axios';

const createUser = params => () => (
  axios.post('/api/signup', params).then((response) => {
    console.log(response); // eslint-disable-line no-console
  })
);

export default createUser;
