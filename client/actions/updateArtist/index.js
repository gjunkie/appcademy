import axios from 'axios';
import loadNominee from '../loadNominee';

const updateArtist = data => dispatch => (
  axios.patch('/api/artist', data).then(res => (
    dispatch(loadNominee(res.data))
  ))
);

export default updateArtist;
