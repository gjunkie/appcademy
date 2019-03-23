import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    };
  }

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

  setUsername = (username) => {
    const { onSetUserName } = this.props;
    onSetUserName(username);
  }

  renderMyGames = () => {
    const { myGames } = this.props;
    return myGames.map(game => (
      <li>
        <span>{game.id}</span>
        -
        <span>{game.inviteCode}</span>
      </li>
    ));
  }

  render() {
    const { user } = this.state;
    const { createGame, joinGame, setUsername } = this;

    return (
      <div className="profile">
        <h2>Profile</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={user.username}
            onChange={setUsername}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={user.email}
            onChange={setUsername}
          />
        </div>
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
