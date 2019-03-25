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

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }

  onSearch = () => {
    const { onSearchFilm } = this.props;
    const { title } = this.state;

    onSearchFilm(title);
  }

  renderResults = () => {
    const { searchResults } = this.props;
    return searchResults.map((film) => {
      const imageUrl = `http://image.tmdb.org/t/p/w92//${film.poster_path}`;
      return (
        <li key={film.id}>
          <img alt={film.title} src={imageUrl} />
          <h4>{film.title} ({film.release_date})</h4>
          <p>{film.overview}</p>
        </li>
      );
    });
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
            onKeyUp={this.onKeyUp}
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
