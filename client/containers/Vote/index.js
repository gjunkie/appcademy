import React, { Component } from 'react';
import { object } from 'prop-types';

import 'isomorphic-fetch';
// import './styles.css';

class Vote extends Component {
  createGame = () => {
    this.props.onCreateGame();
  }

  joinGame = (gameId) => {
    this.props.onJoinGame(gameId);
  }

  setUserName = (userName) => {
    this.props.onSetUserName(userName);
  }

  // good candidate for react hooks
  render() {
    return (
      <div className="profile">
        <h2>Vote</h2>
        <input
          value={this.props.user.name}
          onChange={this.setUserName} />
        <div>
          <button onClick={this.createGame}>Create Game</button>
          <button onClick={this.joinGame}>Join Game</button>
        </div>
      </div>
    )
  };
};

Vote.defaultProps = {
  user: {},
};

Vote.propTypes = {
  user: object,
};

export default Vote;
