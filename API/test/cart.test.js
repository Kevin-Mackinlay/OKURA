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

describe('Cart Endpoints', () => {
  let createdCartId;

  // Test for creating a cart
  it('should create a cart', (done) => {
    const newCart = {
      userId: 'user_id',
      products: [
        {
          productId: 'product_id',
          quantity: 1,
        },
      ],
    };
    request(app)
      .post('/api/carts')
      .send(newCart)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id');
        createdCartId = res.body._id;
        done();
      });
  });

  // Test for updating a cart
  it('should update the cart', (done) => {
    const updatedCart = {
      products: [
        {
          productId: 'product_id',
          quantity: 2,
        },
      ],
    };
    request(app)
      .put(`/api/carts/${createdCartId}`)
      .send(updatedCart)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.products[0]).to.have.property('quantity', 2);
        done();
      });
  });

  // Test for fetching a user's cart
  it('should get a user cart', (done) => {
    const userId = 'user_id';
    request(app)
      .get(`/api/carts/find/${userId}`)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('userId', userId);
        done();
      });
  });

  // Test for fetching all carts
  it('should get all carts', (done) => {
    request(app)
      .get('/api/carts')
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for deleting a cart
  it('should delete the cart', (done) => {
    request(app)
      .delete(`/api/carts/${createdCartId}`)
      .set('token', `Bearer ${validToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('Cart deleted');
        done();
      });
  });
});
