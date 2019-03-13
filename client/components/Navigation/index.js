import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="nav">
      <li><Link to={`/example/`}>Example Route</Link></li>
      <li><Link to={`/vote/`}>Vote</Link></li>
      <li><Link to={`/profile/`}>Profile</Link></li>
      <li><Link to={`/login/`}>Login</Link></li>
      <li><Link to={`/signup/`}>Sign Up</Link></li>
    </ul>
  );
};

export default Navigation;
