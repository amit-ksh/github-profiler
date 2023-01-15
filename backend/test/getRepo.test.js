const request = require('supertest');

const app = require('../src/app');

describe('GET /octocat/repos?page=10', () => {
  const page = 10;
  it('responds with a array of repos', (done) => {
    request(app)
      .get(`/octocat/repos?page=${page}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err || res.body.data.length > page) {
          return done(err);
        }

        return done();
      });
  });
});

describe('GET /octocat214342/repos?page=10', () => {
  it('responds with a 404 message', (done) => {
    request(app)
      .get('/octocat214342/repos?page=10')
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
