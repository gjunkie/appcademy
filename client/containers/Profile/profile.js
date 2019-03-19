import React, { Component } from 'react';
import { func, object } from 'prop-types';

class Profile extends Component {
  createGame = () => {
    const { onCreateGame, user } = this.props;
    onCreateGame(user);
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
    const { user } = this.props;
    const { createGame, joinGame, setUserName } = this;

    return (
      <div className="profile">
        <h2>Profile</h2>
        <input
          value={user.name}
          onChange={setUserName}
        />
        <div>
          <button onClick={createGame}>Create Game</button>
          <button onClick={joinGame}>Join Game</button>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: object.isRequired,
  onCreateGame: func.isRequired,
  onJoinGame: func.isRequired,
  onSetUserName: func.isRequired,
};

export default Profile;
