import { connect } from 'react-redux';
import actions from '../../actions';
import Login from './login';

const mapStateToProps = state => ({
  users: state.users || [],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (userCreds) => (
    dispatch(actions.login(userCreds))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default ConnectedContainer;

