import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { array, bool, func } from 'prop-types';

import categories from '../helpers/categories2019';

const Game = ({
  getNominees,
  isAuthenticated,
  nominees,
}) => {
  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  useEffect(() => {
    getNominees();
  }, []);

  const renderNominee = nominee => (
    <li key={nominee.filmId}>
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

  const renderCategories = () => (
    categories.map(category => (
      <li key={category.name} className="category">
        <h4>{category.name}</h4>
        { nomineesForCategory(category.name) }
      </li>
    ))
  );

  return (
    <div className="profile">
      Game
      <ul>
        { renderCategories() }
      </ul>
    </div>
  );
};

Game.defaultProps = {
  nominees: [],
};

Game.propTypes = {
  getNominees: func.isRequired,
  isAuthenticated: bool.isRequired,
  nominees: array,
};

export default Game;
