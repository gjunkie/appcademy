import { connect } from 'react-redux';
import actions from '../../actions';
import Game from './game';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
  nominees: state.nominees,
});

const mapDispatchToProps = dispatch => ({
  getNominees: () => (
    dispatch(actions.getNominees())
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
export default ConnectedContainer;
