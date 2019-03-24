import { connect } from 'react-redux';
import actions from '../../actions';
import Game from './game';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
export default ConnectedContainer;
