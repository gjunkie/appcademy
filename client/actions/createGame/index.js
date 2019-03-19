import axios from 'axios';

const createGame = params => dispatch => {
  return axios.post('/api/game', params).then((response) => {
    console.log(response); // eslint-disable-line no-console
    // dispatch(loadUser(response.data));
  });
};

export default createGame;
