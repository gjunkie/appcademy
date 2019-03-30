import axios from 'axios';
import loadNominees from '../loadNominees';

export const getMyGames = () => dispatch => (
  axios
    .get('/api/nominees')
    .then(res => (
      dispatch(loadNominees(res.data))
    )).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    })
);

export default getMyGames;
