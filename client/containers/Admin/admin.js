import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'prop-types';

class Admin extends Component {
  state = {
    errors: {},
    title: '',
  }

  onSearch = () => {
    const { onSearchFilm } = this.props;
    const { title } = this.state;

    onSearchFilm(title);
  }

  renderResults = () => {
    const { searchResults } = this.props;
    return searchResults.map(film => (
      <li key={film.id}>
        <span>
          {film.title} ({film.release_date})
        </span>
      </li>
    ));
  }

  setMovieTitle = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  render() {
    const {
      errors,
      isSubmitting,
      title,
    } = this.state;
    return (
      <div className="profile">
        <h2>Admin</h2>
        <div>
          <label htmlFor="identifier">Movie Title</label>
          <input
            id="title"
            name="title"
            onChange={this.setMovieTitle}
            type="text"
            value={title}
          />
          {errors.title && <span>{errors.title}</span>}
          <button disabled={isSubmitting} onClick={this.onSearch}>Search</button>
        </div>
        { this.renderResults() }
      </div>
    );
  }
}

Admin.defaultProps = {
  searchResults: [],
};

Admin.propTypes = {
  isAuthenticated: bool.isRequired,
  onSearchFilm: func.isRequired,
  searchResults: array,
  user: object.isRequired,
};

export default Admin;
