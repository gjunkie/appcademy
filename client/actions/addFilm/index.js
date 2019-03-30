import axios from 'axios';
import loadGame from '../loadGame';

const addFilm = data => dispatch => (
  axios.post('/api/film', data).then((response) => {
    console.log(response)
    dispatch(loadGame(response.data));
  })
);

export default addFilm;
