import axios from 'axios';
import loadNominee from '../loadNominee';

const addArtist = data => dispatch => (
  axios.post('/api/artist', data).then(res => (
    dispatch(loadNominee(res.data))
  ))
);

export default addArtist;
