import axios from 'axios';
import loadNominee from '../loadNominee';

const updateFilm = data => dispatch => (
  axios.patch('/api/film', data).then(res => (
    dispatch(loadNominee(res.data))
  ))
);

export default updateFilm;
