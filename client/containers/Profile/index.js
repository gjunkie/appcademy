import React, { Component } from 'react';
import { object } from 'prop-types';

import 'isomorphic-fetch';
// import './styles.css';

class Profile extends Component {
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
        <h2>Profile</h2>
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

Profile.defaultProps = {
  user: {},
};

Profile.propTypes = {
  user: object,
};

export default Profile;
