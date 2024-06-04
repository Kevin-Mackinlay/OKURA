const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const app = require('../index'); // Adjust the path if necessary

// Load environment variables
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generate a test token
const validToken = jwt.sign({ id: 'user_id', isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });

describe('GET /api/users', () => {
  it('should return all users', (done) => {
    request(app)
      .get('/api/users')
      .set('token', `Bearer ${validToken}`) // Setting the token in the 'token' header
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('PUT /api/users/:id', () => {
  it('should update the user', (done) => {
    const updatedInfo = {
      username: 'newUsername', // Ensure this matches the expected updated name
      email: 'newuser11@gmail.com',
      password: 'U2FsdGVkX18SZvwT3IGORHd1fskh6zwSgaIOvgR8OF4=',
      isAdmin: true,
      isPremium: false,
      profileImg: '',
    };
    request(app)
      .put('/api/users/665e1ea106e06a0466463919') // Use a valid user ID
      .send(updatedInfo)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('username', 'newUsername'); // Match this with the updatedInfo
        done();
      });
  });
});

describe('should get a single user', () => {
  it('should get a single user by ID', (done) => {
    const userId = '664fc6e85a0563cb3c0116d0'; // Use a valid user ID
    request(app)
      .get(`/api/users/find/${userId}`)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', userId);
        done();
      });
  });
});