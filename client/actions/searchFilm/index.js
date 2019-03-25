import axios from 'axios';
import loadSearchResults from '../loadSearchResults';

const apiKey = 'fc177c93d4721138d6300feac0052bb1';
const baseUrl = 'https://api.themoviedb.org/3/search/movie';
const lang = 'en-US';
const page = '1';

const searchFilm = title => (dispatch) => {
  const urlSafeTitle = encodeURIComponent(title);

  axios.get(`${baseUrl}?api_key=${apiKey}&${lang}&query=${urlSafeTitle}&${page}`)
    .then((res) => {
      console.log(res)
      dispatch(loadSearchResults(res.data.results));
    })
    .catch(err => err);
};

export default searchFilm;
