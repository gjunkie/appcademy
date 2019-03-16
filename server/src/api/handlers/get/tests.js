import assert from 'assert';
import { expect } from 'chai';
import nock from 'nock';

//var API = require('../client/api');
//var sampleGet = API.sampleGet;
//var samplePost = API.samplePost;

describe('Request', function() {

  it('should fetch a user', function() {
    const sampleUser = {
      id: '1',
      name: 'Master Shake',
      title: 'Detective',
    };

    nock('http://localhost/api')
      .get('/getuser')
      .query({id: 1})
      .reply(200, sampleUser);

    return sampleGet(1).then(function(response) {
      expect(response.id).to.equal(sampleUser.id);
      expect(response.name).to.equal(sampleUser.name);
      expect(response.title).to.equal(sampleUser.title);
    });
  });
})
