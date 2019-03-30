import { connect } from 'react-redux';
import actions from '../../actions';
import admin from './admin';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
  nominees: state.nominees,
});

const mapDispatchToProps = dispatch => ({
  getNominees: () => (
    dispatch(actions.getNominees())
  ),
  onAddFilm: data => (
    dispatch(actions.addFilm(data))
  ),
  onUpdateFilm: data => (
    dispatch(actions.updateFilm(data))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(admin);
export default ConnectedContainer;
