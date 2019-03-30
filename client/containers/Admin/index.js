import { connect } from 'react-redux';
import actions from '../../actions';
import admin from './admin';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onAddFilm: data => (
    dispatch(actions.addFilm(data))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(admin);
export default ConnectedContainer;
