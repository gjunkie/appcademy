import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

import validateInput from '../../helpers/validators/profile';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
      errors: {},
      isSubmitting: false,
      user: props.user,
      username: props.user.username,
    };
  }

  componentDidMount() {
    const { onGetMyGames, user } = this.props;
    onGetMyGames(user.id);
  }

  isValid = () => {
    const { user } = this.state;
    const { errors, isValid } = validateInput(user);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  createGame = () => {
    const { onCreateGame, user } = this.props;
    onCreateGame(user);
  }

  joinGame = (gameId) => {
    const { onJoinGame } = this.props;
    onJoinGame(gameId);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.isValid()) return;

    this.setState({
      errors: {},
      isSubmitting: true,
    });

    const { email, username } = this.state;
    const { onUpdateProfile, user } = this.props;
    const updatedUser = {
      email,
      id: user.id,
      username,
    };

    onUpdateProfile(updatedUser);
  }

  renderMyGames = () => {
    const { myGames } = this.props;
    return myGames.map(game => (
      <li key={game.id}>
        <span>{game.id}</span>
        --
        <span>{game.inviteCode}</span>
      </li>
    ));
  }

  render() {
    const {
      email,
      errors,
      isSubmitting,
      username,
    } = this.state;
    const { createGame, joinGame } = this;

    return (
      <div className="profile">
        <h2>Profile</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={this.onChange}
            />
            {errors.username && <span>{errors.username}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <button disabled={isSubmitting}>Update Profile</button>
        </form>

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
  myGames: array,
  user: object.isRequired,
  onCreateGame: func.isRequired,
  onGetMyGames: func.isRequired,
  onJoinGame: func.isRequired,
  onUpdateProfile: func.isRequired,
};

export default Profile;
