import React from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'prop-types';

const Home = (props) => {
  const {
    isAuthenticated,
    myGames,
    onGetMyGames,
    user,
  } = props;

  if (isAuthenticated) {
    onGetMyGames(user.id);
  }

  const renderMyGames = () => (
    myGames.map(game => (
      <li key={game.id}>
        <span>{game.id}</span>
        --
        <span>{game.inviteCode}</span>
      </li>
    ))
  );

  return (
    <div className="profile">
      <h2>Home</h2>
      { renderMyGames() }
    </div>
  );
};

Home.defaultProps = {
  myGames: [],
  user: {},
};

Home.propTypes = {
  isAuthenticated: bool.isRequired,
  myGames: array,
  onGetMyGames: func.isRequired,
  user: object,
};

export default Home;
