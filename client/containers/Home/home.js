import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

class Home extends Component {
  componentDidMount() {
    const { onGetMyGames, user } = this.props;
    onGetMyGames(user.id);
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
    return (
      <div className="profile">
        <h2>Home</h2>
        { this.renderMyGames() }
      </div>
    );
  }
}

Home.defaultProps = {
  myGames: [],
};

Home.propTypes = {
  myGames: array,
  onGetMyGames: func.isRequired,
  user: object.isRequired,
};

export default Home;
