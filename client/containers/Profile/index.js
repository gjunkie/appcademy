import { connect } from 'react-redux';
import actions from '../../actions';
import profile from './profile';

const mapStateToProps = state => ({
  myGames: state.myGames,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getMyGames: userId => (
    dispatch(actions.getMyGames(userId))
  ),
  onCreateGame: userData => (
    dispatch(actions.createGame(userData))
  ),
  onJoinGame: userId => (
    dispatch(actions.joinGame(userId))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(profile);
export default ConnectedContainer;
