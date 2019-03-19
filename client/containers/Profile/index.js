import { connect } from 'react-redux';
import actions from '../../actions';
import profile from './profile';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onCreateGame: userData => (
    dispatch(actions.createGame(userData))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(profile);
export default ConnectedContainer;
