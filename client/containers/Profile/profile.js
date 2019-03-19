import React, { Component } from 'react';
import { func, object } from 'prop-types';

class Profile extends Component {
  createGame = () => {
    const { onCreateGame } = this.props;
    onCreateGame();
  }

  joinGame = (gameId) => {
    const { onJoinGame } = this.props;
    onJoinGame(gameId);
  }

  setUserName = (userName) => {
    const { onSetUserName } = this.props;
    onSetUserName(userName);
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
    );
  }
}

Profile.defaultProps = {
  user: {},
};

Profile.propTypes = {
  user: object,
  onCreateGame: func.isRequired,
  onJoinGame: func.isRequired,
  onSetUserName: func.isRequired,
};

export default Profile;
