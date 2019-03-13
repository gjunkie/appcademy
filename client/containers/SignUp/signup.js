import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onCreateUser(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Sign Up!</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={this.onChange}
            type="text"
            value={this.state.username} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={this.onChange}
            type="text"
            value={this.state.email} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            onChange={this.onChange}
            type="password"
            value={this.state.password} />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={this.onChange}
            type="password"
            value={this.state.passwordConfirmation} />
        </div>

        <button>Sign Up</button>
      </form>
    )
  };
};

export default SignUp;
