import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { bool, func } from 'prop-types';

const Admin = ({
  isAuthenticated,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = () => {
    const apiKey = 'fc177c93d4721138d6300feac0052bb1';
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const lang = 'en-US';
    const page = '1';
    const urlSafeTitle = encodeURIComponent(title);

    setIsSubmitting(true);

    axios.get(`${baseUrl}?api_key=${apiKey}&${lang}&query=${urlSafeTitle}&${page}`)
      .then((res) => {
        setSearchResults(res.data.results);
        setIsSubmitting(false);
      })
      .catch(err => err);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => (
    searchResults.map((film) => {
      const imageUrl = `http://image.tmdb.org/t/p/w92//${film.poster_path}`;
      return (
        <li key={film.id}>
          <img alt={film.title} src={imageUrl} />
          <h4>
            {film.title}
            ({film.release_date})
          </h4>
          <p>{film.overview}</p>
        </li>
      );
    })
  );

  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="profile">
      <h2>Admin</h2>
      <div>
        <label htmlFor="identifier">Movie Title</label>
        <input
          id="title"
          name="title"
          onChange={event => setTitle(event.target.value)}
          onKeyUp={onKeyUp}
          type="text"
          value={title}
        />
        <button disabled={isSubmitting || !title.length} onClick={onSearch}>Search</button>
      </div>
      { renderResults() }
    </div>
  );
};

Admin.propTypes = {
  isAuthenticated: bool.isRequired,
};

export default Admin;
