import React, { Component } from 'react'                    
import { string } from 'prop-types';

const User = ({
  id,
  name,
  title,
}) => {
  return (
    <div>
      <div>
        <strong>ID</strong>: {id}
      </div>
      <div>
        <strong>Name</strong>: {name}
      </div>
      <div>
        <strong>Title</strong>: {title}
      </div>
    </div>
  );
}

User.propTypes = {
  id: string,
  name: string,
  title: string,
};

export default User;
