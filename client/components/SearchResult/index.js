import React, { Fragment } from 'react';
import { object } from 'prop-types';

const SearchResult = ({
  result,
}) => {
  const title = result.title || result.name;
  const imagePath = result.poster_path || result.profile_path;
  const imageUrl = `http://image.tmdb.org/t/p/w92//${imagePath}`;

  return (
    <Fragment>
      <img alt={title} src={imageUrl} />
      <h4>
        {title}
        (
        {result.release_date}
        )
      </h4>
      <p>{result.overview}</p>
    </Fragment>
  );
};

SearchResult.propTypes = {
  result: object.isRequired,
};

export default SearchResult;
