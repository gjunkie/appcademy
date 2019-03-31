import axios from 'axios';

const apiKey = 'fc177c93d4721138d6300feac0052bb1';
const baseUrl = 'https://api.themoviedb.org/3/search/';

const search = options => () => (
  axios.get(`${baseUrl}${options.type}?api_key=${apiKey}&lang=en-US&query=${options.query}&page=1`)
);

export default search;
