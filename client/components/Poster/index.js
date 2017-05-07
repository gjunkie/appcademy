import React, { Component } from 'react'                    
import MovieImage from '../MovieImage';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="poster">
        <MovieImage/>
      </div>
    )
  }
}
