import { connect } from 'react-redux';
import actions from '../../actions';
import admin from './admin';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
  searchResults: state.searchResults,
});

const mapDispatchToProps = dispatch => ({
  onSearchFilm: title => (
    dispatch(actions.searchFilm(title))
  ),
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(admin);
export default ConnectedContainer;
