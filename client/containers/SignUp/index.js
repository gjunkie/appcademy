import { connect } from 'react-redux';
import actions from '../../actions';
import signup from './signup';

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: userData => (
    dispatch(actions.createUser(userData))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(signup);
export default ConnectedContainer;
