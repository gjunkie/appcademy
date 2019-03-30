import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { array, bool, func } from 'prop-types';

const Admin = ({
  categories,
  isAuthenticated,
  nominees,
  onAddFilm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titles, setTitle] = useState({});
  const [searchResults, setSearchResults] = useState({});

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

  const addFilm = (film, category) => {
    onAddFilm({ film, category });
  };

  const onKeyUp = (e, categoryName) => {
    if (e.keyCode === 13) {
      onSearch(categoryName);
    }
  };

  const renderNominees = (categoryName) => {
    const categoryNominees = nominees.filter(nominee => nominee.nominations.includes(categoryName));
    return categoryNominees.map(nominee => (
      <li key={nominee.id}>
        <div>{nominee.name}</div>
      </li>
    ));
  };

  const renderResults = (category) => {
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
          <button type="button" onClick={() => addFilm(film, category)}>Add Film</button>
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
        { renderNominees(category.name) }

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
            { renderResults(category) }
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
  categories: [
    {
      type: 'film',
      name: 'Best Picture',
    },
    {
      type: 'artist',
      name: 'Lead Actor',
    },
    {
      type: 'artist',
      name: 'Lead Actress',
    },
    {
      type: 'artist',
      name: 'Supporting Actor',
    },
    {
      type: 'artist',
      name: 'Supporting Actress',
    },
    {
      type: 'artist',
      name: 'Director',
    },
    {
      type: 'film',
      name: 'Animated Feature',
    },
    {
      type: 'film',
      name: 'Animated Short',
    },
    {
      type: 'film',
      name: 'Adapted Screenplay',
    },
    {
      type: 'film',
      name: 'Original Screenplay',
    },
    {
      type: 'film',
      name: 'Cinematography',
    },
    {
      type: 'film',
      name: 'Best Documentary Feature',
    },
    {
      type: 'film',
      name: 'Best Documentary Short Subject',
    },
    {
      type: 'film',
      name: 'Best Live Action Short Film',
    },
    {
      type: 'film',
      name: 'Best Foreign Language Film',
    },
    {
      type: 'film',
      name: 'Film Editing',
    },
    {
      type: 'film',
      name: 'Sound Editing',
    },
    {
      type: 'film',
      name: 'Sound Mixing',
    },
    {
      type: 'film',
      name: 'Production Design',
    },
    {
      type: 'film',
      name: 'Original Score',
    },
    {
      type: 'film',
      name: 'Original Song',
    },
    {
      type: 'film',
      name: 'Makeup and Hair',
    },
    {
      type: 'film',
      name: 'Costume Design',
    },
    {
      type: 'film',
      name: 'Visual Effects',
    },
  ],
  nominees: [],
};

Admin.propTypes = {
  categories: array,
  isAuthenticated: bool.isRequired,
  nominees: array,
  onAddFilm: func.isRequired,
};

export default Admin;
