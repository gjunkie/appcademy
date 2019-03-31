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
    const categoryNominees = nominees
      .filter(nominee => nominee.nominations.includes(category.name));
    if (!categoryNominees) return null;

    return (
      <ul>
        { renderNominees(category, categoryNominees) }
      </ul>
    );
  };

  const renderCategories = () => (
    categories.map(category => (
      <li key={category.name} className="category">
        <h4>{category.name}</h4>
        { nomineesForCategory(category) }
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
