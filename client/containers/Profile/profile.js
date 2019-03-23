import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

class Profile extends Component {
  componentDidMount() {
    const { getMyGames, user } = this.props;
    getMyGames(user.id);
  }

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

  renderMyGames = () => {
    const { myGames } = this.props;
    return myGames.map(game => (
      <li>{game.id}</li>
    ));
  }

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
          <button type="button" onClick={createGame}>Create Game</button>
          <button type="button" onClick={joinGame}>Join Game</button>
        </div>

        { this.renderMyGames() }
      </div>
    );
  }
}

Profile.defaultProps = {
  myGames: [],
};

Profile.propTypes = {
  getMyGames: func.isRequired,
  myGames: array,
  user: object.isRequired,
  onCreateGame: func.isRequired,
  onJoinGame: func.isRequired,
  onSetUserName: func.isRequired,
};

export default Profile;
