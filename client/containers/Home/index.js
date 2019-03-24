import { connect } from 'react-redux';
import actions from '../../actions';
import Home from './home';

const mapStateToProps = state => ({
  myGames: state.myGames || [],
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onGetMyGames: userId => (
    dispatch(actions.getMyGames(userId))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedContainer;
