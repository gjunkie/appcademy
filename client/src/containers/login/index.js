import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const Link = require('react-router').Link
const { any } = PropTypes;

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <p>Choose your method for loging in.</p>
        <Link to={`/login/gmail`}>Gmail</Link>
      </div>
    )
  }
}

Login.propTypes = {
  users: any,
};

const mapStateToProps = state => ({
  users: state.users || [],
});

const mapDispatchToProps = {
  // maybe consolidate actions into some sort
  // of api export to not get confused with
  // the naming here.
  // getUser,
  //getUser: getUser,
};

const GetContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default GetContainer
