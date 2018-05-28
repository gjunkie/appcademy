import React, { Component } from 'react';
import faker from 'faker';
import User from '../../components/User';

const renderUser = (user, onDelete) => (
  <li key={user.id}>
    <User
      id={user.id}
      name={user.name}
      title={user.title}
      onDelete={onDelete} />
  </li>
);

export const getNewUser = () => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  title: faker.name.jobTitle(),
});

export const renderUsers = (users, onDelete) => (
  users.map(user => renderUser(user, onDelete))
);
