const request = require('supertest');

const app = require('../src/app');

describe('GET /octocat', () => {
  const username = 'octocat';
  it('responds with a user data', (done) => {
    request(app)
      .get(`/${username}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err || res.body.data.login !== username) {
          return done(err);
        }

        return done();
      });
  });
});

describe('GET /octocat214342', () => {
  it('responds with 404 message', (done) => {
    request(app)
      .get('/octocat214342')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        404,
        {
          data: {
            message: 'Not Found!',
          },
        },
        done,
      );
  });
});
