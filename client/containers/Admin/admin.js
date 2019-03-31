import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { array, bool, func } from 'prop-types';

import SearchResult from '../../components/SearchResult';

import categories from '../helpers/categories2019';

const Admin = ({
  getNominees,
  isAuthenticated,
  nominees,
  onAddArtist,
  onAddFilm,
  onUpdateArtist,
  onUpdateFilm,
  search,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerms, setSearchTerm] = useState({});
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    getNominees();
  }, []);

  const onSearch = (category) => {
    const urlSafeQuery = encodeURIComponent(searchTerms[category.name]);

    setIsSubmitting(true);
    search({
      type: category.type,
      query: urlSafeQuery,
    })
      .then((res) => {
        setSearchResults({ [category.name]: res.data.results });
        setIsSubmitting(false);
      })
      .catch(err => err);
  };

  const onKeyUp = (e, category) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      onSearch(category);
    }
  };

  const renderNominee = (category, nominee) => {
    if (category.type === 'movie') {
      return (
        <li key={nominee.id}>
          <div>{nominee.title}</div>
        </li>
      );
    }
    return (
      <li key={nominee.id}>
        <div>{nominee.name}</div>
      </li>
    );
  };

  const renderNominees = (category, categoryNominees) => (
    categoryNominees.map(nominee => (
      renderNominee(category, nominee)
    ))
  );

  const nomineesForCategory = (category) => {
    const categoryNominees = nominees.filter(nominee => (
      nominee.nominations.includes(category.name)
    ));
    if (!categoryNominees) return null;

    return (
      <ul>
        { renderNominees(category, categoryNominees) }
      </ul>
    );
  };

  const renderButton = (callback, params) => (
    <button
      type="button"
      onClick={() => {
        callback(params).then(() => setSearchResults({}));
      }}
    >
      Add
    </button>
  );

  const renderAddButton = (result, category) => {
    const nomineeIds = nominees.map(nominee => nominee.entityId);

    if (category.type === 'movie') {
      const callback = nomineeIds.includes(result.id.toString()) ? onUpdateFilm : onAddFilm;
      return renderButton(callback, { film: result, category });
    }

    const callback = nomineeIds.includes(result.id.toString()) ? onUpdateArtist : onAddArtist;
    return renderButton(callback, { artist: result, category });
  };

  const renderSearchResults = (category) => {
    if (!searchResults[category.name]) return null;
    return searchResults[category.name].map(result => (
      <li key={result.id}>
        <SearchResult result={{ ...result, type: category.type }} />
        { renderAddButton(result, category) }
      </li>
    ));
  };

  const hasValidTitle = categoryName => (
    searchTerms[categoryName] && searchTerms[categoryName].length
  );

  const renderSearchButton = category => (
    <button
      type="button"
      disabled={isSubmitting || hasValidTitle(searchTerms[category.name])}
      onClick={() => onSearch(category)}
    >
      Search
    </button>
  );

  const renderCategories = () => (
    categories.map(category => (
      <li key={category.id}>

        <div>{category.name}</div>
        { nomineesForCategory(category) }

        <div>
          <label htmlFor="identifier">
            <input
              id="title"
              name="title"
              onChange={e => setSearchTerm({ ...searchTerms, [category.name]: e.target.value })}
              onKeyUp={e => onKeyUp(e, category)}
              placeholder="Search..."
              type="text"
              value={searchTerms[category.name]}
            />
          </label>
          { renderSearchButton(category) }

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
  onAddArtist: func.isRequired,
  onAddFilm: func.isRequired,
  onUpdateArtist: func.isRequired,
  onUpdateFilm: func.isRequired,
  search: func.isRequired,
};

export default Admin;
