import axios from 'axios';
import loadMyGames from '../loadMyGames';

const joinGame = params => dispatch => (
  axios.post('/api/joingame', params)
    .then(res => (
      dispatch(loadMyGames(res.data))
    ))
);

export default joinGame;
