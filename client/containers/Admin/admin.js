import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  array,
  bool,
  func,
} from 'prop-types';

const Admin = ({
  isAuthenticated,
  onSearchFilm,
  searchResults,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');

  const onSearch = () => {
    setIsSubmitting(true);
    onSearchFilm(title).then(() => setIsSubmitting(false));
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

Admin.defaultProps = {
  searchResults: [],
};

Admin.propTypes = {
  isAuthenticated: bool.isRequired,
  onSearchFilm: func.isRequired,
  searchResults: array,
};

export default Admin;
