import { connect } from 'react-redux';
import actions from '../../actions';
import Login from './login';

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  users: state.users || [],
});

const mapDispatchToProps = dispatch => ({
  onLogin: userCreds => (
    dispatch(actions.login(userCreds))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default ConnectedContainer;
