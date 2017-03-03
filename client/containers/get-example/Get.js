import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/getUser'
import 'isomorphic-fetch';
import User from '../../components/User';

const { any, func } = PropTypes;

class GetExample extends Component {
  //constructor() {
    //super();
    //this.state = { user: {} }
  //}

  //componentDidMount() {
    //fetch('http://localhost:8000/api/exampleget')
    //.then((response) => {
      //return response.json();
    //})
    //.then((jsonResponse) => {
      //// do something with jsonResponse
      //this.setState({ user: jsonResponse });
    //}).catch((err) => {
      //// console.log(err);
      //// something went wrong: err
    //});
  //}

  render() {

    let allUsers = this.props.users.map((user) => {
       return <User name={user.name} title={user.title} />;
    })

    return (
      <div>
        <h2>GET Example</h2>
        <p>On this page we are making a GET request and setting the json response as the state. Then we pass the user data down to the User component.</p>
        <button onClick={() => this.props.getUser(1)}>Get User</button>

        {allUsers}
      </div>
    )
  }
}

GetExample.propTypes = {
  users: any,
  getUser: func,
};

const mapStateToProps = state => ({
  users: state.users || [],
});

const mapDispatchToProps = {
  // maybe consolidate actions into some sort
  // of api export to not get confused with
  // the naming here.
  // addUser,
  getUser: getUser,
};

const GetContainer = connect(mapStateToProps, mapDispatchToProps)(GetExample);
export default GetContainer

