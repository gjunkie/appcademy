import React from 'react';
import { func, object } from 'prop-types';

const User = (props) => {
  return (
    <div>
      <div>
        <strong>ID</strong>: {props.user.id}
      </div>
      <div>
        <strong>Name</strong>: {props.user.name}
      </div>
      <div>
        <strong>Title</strong>: {props.user.title}
      </div>
      <button onClick={() => {
        props.onDelete(props.user.id);
      }}>
        Delete User
      </button>
    </div>
  )
}

User.propTypes = {
  user: object,
  onDelete: func,
};

export default User;
