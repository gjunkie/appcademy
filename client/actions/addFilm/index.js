import axios from 'axios';
import loadNominee from '../loadNominee';

const addFilm = data => dispatch => (
  axios.post('/api/film', data).then(res => (
    dispatch(loadNominee(res.data))
  ))
);

export default addFilm;
