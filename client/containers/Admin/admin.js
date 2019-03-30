import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { array, bool, func } from 'prop-types';

import categories from '../helpers/categories2019';

const Admin = ({
  getNominees,
  isAuthenticated,
  nominees,
  onAddFilm,
  onUpdateFilm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titles, setTitle] = useState({});
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    getNominees();
  }, []);

  const onSearch = (categoryName) => {
    const apiKey = 'fc177c93d4721138d6300feac0052bb1';
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const lang = 'en-US';
    const page = '1';
    const urlSafeTitle = encodeURIComponent(titles[categoryName]);

    setIsSubmitting(true);

    axios.get(`${baseUrl}?api_key=${apiKey}&${lang}&query=${urlSafeTitle}&${page}`)
      .then((res) => {
        setSearchResults({ [categoryName]: res.data.results });
        setIsSubmitting(false);
      })
      .catch(err => err);
  };

  const onKeyUp = (e, categoryName) => {
    if (e.keyCode === 13) {
      onSearch(categoryName);
    }
  };

  const renderNominee = nominee => (
    <li key={nominee.id}>
      <div>{nominee.title}</div>
    </li>
  );

  const renderNominees = categoryNominees => (
    categoryNominees.map(nominee => (
      renderNominee(nominee)
    ))
  );

  const nomineesForCategory = (categoryName) => {
    const categoryNominees = nominees.filter(nominee => nominee.nominations.includes(categoryName));
    if (!categoryNominees) return null;

    return (
      <ul>
        { renderNominees(categoryNominees) }
      </ul>
    );
  };

  const renderAddButton = (film, category) => {
    const nomineeIds = nominees.map(nominee => nominee.filmId);

    if (nomineeIds.includes(film.id.toString())) {
      return (
        <button type="button" onClick={() => onUpdateFilm({ film, category })}>Add Film</button>
      );
    }
    return (
      <button type="button" onClick={() => onAddFilm({ film, category })}>Add Film</button>
    );
  };

  const renderSearchResults = (category) => {
    if (!searchResults[category.name]) return null;
    return searchResults[category.name].map((film) => {
      const imageUrl = `http://image.tmdb.org/t/p/w92//${film.poster_path}`;
      return (
        <li key={film.id}>
          <img alt={film.title} src={imageUrl} />
          <h4>
            {film.title}
            (
            {film.release_date}
            )
          </h4>
          <p>{film.overview}</p>
          { renderAddButton(film, category) }
        </li>
      );
    });
  };

  const hasValidTitle = categoryName => (
    titles[categoryName] && titles[categoryName].length
  );

  const renderCategories = () => (
    categories.map(category => (
      <li key={category.id}>

        <div>{category.name}</div>
        { nomineesForCategory(category.name) }

        <div>
          <label htmlFor="identifier">
            Add Film
            <input
              id="title"
              name="title"
              onChange={event => setTitle({ ...titles, [category.name]: event.target.value })}
              onKeyUp={event => onKeyUp(event, category.name)}
              type="text"
              value={titles[category.name]}
            />
          </label>
          <button type="button" disabled={isSubmitting || hasValidTitle(titles[category.name])} onClick={() => onSearch(category.name)}>Search</button>

          <ul>
            { renderSearchResults(category) }
          </ul>
        </div>
      </li>
    ))
  );

  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="admin">
      <h2>Admin</h2>
      <div className="categories">
        { renderCategories() }
      </div>
    </div>
  );
};


Admin.defaultProps = {
  nominees: [],
};

Admin.propTypes = {
  getNominees: func.isRequired,
  isAuthenticated: bool.isRequired,
  nominees: array,
  onAddFilm: func.isRequired,
  onUpdateFilm: func.isRequired,
};

export default Admin;
