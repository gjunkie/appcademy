import React, { useEffect } from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'prop-types';

const Home = ({
  isAuthenticated,
  myGames,
  onGetMyGames,
  user,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      onGetMyGames(user.id);
    }
  }, [myGames.length]);

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
};

Home.propTypes = {
  isAuthenticated: bool.isRequired,
  myGames: array,
  onGetMyGames: func.isRequired,
  user: object.isRequired,
};

export default Home;
