import axios from 'axios';
import loadGame from '../loadGame';

const createGame = params => dispatch => (
  axios.post('/api/game', params).then((response) => {
    dispatch(loadGame(response.data));
  })
);

export default createGame;
