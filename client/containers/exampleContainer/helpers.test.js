import assert from 'assert';
import { expect } from 'chai';
import nock from 'nock';

const helpers = require('./helpers');

describe('Request', () => {
  it('should create a new user', () => {
    const user = helpers.default.getNewUser();

    expect(typeof user.id).to.equal('number');
    expect(typeof user.name).to.equal('string');
    expect(typeof user.title).to.equal('string');
  });
});
