import { expect } from 'chai';
import nock from 'nock';

describe('Request', () => {
  it('should save a user', () => {
    const sampleUser = {
      name: 'Taco Salad',
      title: 'Chef',
    };

    nock('http://localhost/api')
      .post('/createuser')
      .reply(201, {
        id: '2',
        name: 'Taco Salad',
        title: 'Chef',
      });

    return samplePost(sampleUser).then(response => {
      expect(response.id).to.equal('2');
      expect(response.name).to.equal(sampleUser.name);
      expect(response.title).to.equal(sampleUser.title);
    });
  });
});
