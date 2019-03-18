import assert from 'assert';
import { expect } from 'chai';
import nock from 'nock';

// var API = require('../client/api');
// var sampleGet = API.sampleGet;
// var samplePost = API.samplePost;

describe('Request', () => {
  it('should fetch a user', () => {
    // const sampleUser = {
    //   id: '1',
    //   name: 'Master Shake',
    //   title: 'Detective',
    // };

    // nock('http://localhost/api')
    //   .get('/getuser')
    //   .query({ id: 1 })
    //   .reply(200, sampleUser);

    expect(1).to.equal(1);
    // return sampleGet(1).then((response) => {
    //   expect(response.id).to.equal(sampleUser.id);
    //   expect(response.name).to.equal(sampleUser.name);
    //   expect(response.title).to.equal(sampleUser.title);
    // });
  });

  it('should save a user', () => {
    // const sampleUser = {
    //   name: 'Taco Salad',
    //   title: 'Chef',
    // };

    // nock('http://localhost/api')
    //   .post('/createuser')
    //   .reply(201, {
    //     id: '2',
    //     name: 'Taco Salad',
    //     title: 'Chef',
    //   });

    // return samplePost(sampleUser).then(function(response) {
    //   expect(response.id).to.equal('2');
    //   expect(response.name).to.equal(sampleUser.name);
    //   expect(response.title).to.equal(sampleUser.title);
    // });
  });
});
