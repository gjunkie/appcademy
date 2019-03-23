import { connect } from 'react-redux';
import actions from '../../actions';
import profile from './profile';

const mapStateToProps = state => ({
  myGames: state.myGames,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onCreateGame: userData => (
    dispatch(actions.createGame(userData))
  ),
  onGetMyGames: userId => (
    dispatch(actions.getMyGames(userId))
  ),
  onJoinGame: userId => (
    dispatch(actions.joinGame(userId))
  ),
  onUpdateProfile: userData => (
    dispatch(actions.updateUser(userData))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(profile);
export default ConnectedContainer;
