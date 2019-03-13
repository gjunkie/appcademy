import { connect } from 'react-redux';
import actions from '../../actions';
import SignUp from './SignUp';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreateUser: (userData) => {
    dispatch(actions.createUser(userData));
  },
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);
export default ConnectedContainer;

