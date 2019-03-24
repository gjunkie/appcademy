import React from 'react';
import { Redirect } from 'react-router-dom';
import { bool } from 'prop-types';

const Game = (props) => {
  const {
    isAuthenticated,
  } = props;

  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <div className="profile">
      Game
    </div>
  );
};

Game.defaultProps = {
};

Game.propTypes = {
  isAuthenticated: bool.isRequired,
};

export default Game;
