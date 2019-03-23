import axios from 'axios';
import loadMyGames from '../loadMyGames';

export const getMyGames = userId => dispatch => (
  axios
    .get('/api/mygames', { params: { userId } })
    .then((response) => {
      dispatch(loadMyGames(response.data));
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    })
);

export default getMyGames;
