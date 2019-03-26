import { connect } from 'react-redux';
import admin from './admin';

const mapStateToProps = state => ({
  isAuthenticated: !!state.isAuthenticated,
});

const mapDispatchToProps = () => ({
});

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps)(admin);
export default ConnectedContainer;
