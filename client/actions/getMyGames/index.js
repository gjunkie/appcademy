import axios from 'axios';
import loadMyGames from '../loadMyGames';

export const getMyGames = userId => dispatch => (
  axios
    .get('/api/mygames', { params: { userId } })
    .then(res => (
      dispatch(loadMyGames(res.data))
    )).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    })
);

export default getMyGames;
