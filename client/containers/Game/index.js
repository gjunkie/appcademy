import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bool } from 'prop-types';

class Game extends Component {
  render() {
    const {
      isAuthenticated,
    } = this.props;

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
  }
}

Game.defaultProps = {
};

Game.propTypes = {
  isAuthenticated: bool.isRequired,
};

export default Game;
