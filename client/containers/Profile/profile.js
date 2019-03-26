import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { array, func, object } from 'prop-types';

import validateInput from '../../helpers/validators/profile';

const Profile = ({
  myGames,
  onCreateGame,
  onGetMyGames,
  onJoinGame,
  onUpdateProfile,
  user,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingInvite, setIsSubmittingInvite] = useState(false);

  useEffect(() => {
    onGetMyGames(user.id);
  }, [myGames.length]);

  const isFormValid = () => {
    const { errors, isValid } = validateInput(user);

    if (!isValid) {
      setFormErrors(errors);
    }

    return isValid;
  };

  const createGame = () => {
    onCreateGame(user);
  };

  const joinGame = (e) => {
    e.preventDefault();
    setIsSubmittingInvite(true);
    onJoinGame({ inviteCode, userId: user.id }).then(() => setIsSubmittingInvite(false));
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setFormErrors({});
    setIsSubmitting(true);

    const updatedUser = {
      email,
      id: user.id,
      username,
    };

    onUpdateProfile(updatedUser);
  };

  const renderMyGames = () => (
    myGames.map(game => (
      <li key={game.id}>
        <Link to={`/game/${game.id}`}>
          <span>{game.id}</span>
          --
          <span>{game.inviteCode}</span>
        </Link>
      </li>
    ))
  );

  return (
    <div className="profile">
      <h2>Profile</h2>
      <form onSubmit={updateProfile}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          {formErrors.username && <span>{formErrors.username}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>
        <button disabled={isSubmitting}>Update Profile</button>
      </form>

      <div>
        <button type="button" onClick={createGame}>Create Game</button>
      </div>

      <form onSubmit={joinGame}>
        <div>
          <input
            id="inviteCode"
            name="inviteCode"
            value={inviteCode}
            onChange={event => setInviteCode(event.target.value)}
          />
          {formErrors.inviteCode && <span>{formErrors.inviteCode}</span>}
        </div>
        <button disabled={isSubmittingInvite}>Join Game</button>
      </form>

      { renderMyGames() }
    </div>
  );
};

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
