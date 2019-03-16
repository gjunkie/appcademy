import React from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';
import { Link } from 'react-router-dom';
import actions from '../../actions';

class Navigation extends React.Component {
  logout = (e) => {
    e.preventDefault();
    this.props.onLogout();
  }

  render() {
    const guestLinks = (
      <ul className="nav">
        <li><Link to="/login/">Login</Link></li>
        <li><Link to="/signup/">Sign Up</Link></li>
      </ul>
    );

    const userLinks = (
      <ul className="nav">
        <li><Link to="/example/">Example Route</Link></li>
        <li><Link to="/vote/">Vote</Link></li>
        <li><Link to="/profile/">Profile</Link></li>
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </ul>
    );

    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return userLinks;
    }
    return guestLinks;
  }
}

Navigation.defaultProps = {
  user: {},
};

Navigation.propTypes = {
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  user: object,
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => (
    dispatch(actions.logout())
  ),
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
