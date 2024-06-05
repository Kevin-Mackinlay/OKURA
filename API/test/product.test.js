const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const app = require('../index'); // Adjust the path if necessary

// Load environment variables
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generate a test token
const validToken = jwt.sign({ id: 'admin_id', isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });

describe('Product Endpoints', () => {
  let createdProductId;

  // Test for creating a product
  it('should create a product', (done) => {
    const newProduct = {
      title: 'Test Product',
      desc: 'This is a test product',
      img: 'https://via.placeholder.com/150',
      categories: ['test'],
      size: 'L',
      color: 'red',
      price: 29.99,
    };
    request(app)
      .post('/api/products')
      .send(newProduct)
      .set('token', `Bearer ${validToken}`) // Use the validToken variable here
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id');
        createdProductId = res.body._id;
        done();
      });
  });

  // Test for updating a product
  it('should update the product', (done) => {
    const updatedProduct = {
      title: 'Updated Product',
      price: 39.99,
    };
    request(app)
      .put(`/api/products/${createdProductId}`)
      .send(updatedProduct)
      .set('token', `Bearer ${validToken}`) // Use the validToken variable here
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('title', 'Updated Product');
        expect(res.body).to.have.property('price', 39.99);
        done();
      });
  });

  // Test for fetching a single product
  it('should get a single product by ID', (done) => {
    request(app)
      .get(`/api/products/find/${createdProductId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', createdProductId);
        done();
      });
  });

  // Test for fetching all products
  it('should get all products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for deleting a product
  it('should delete the product', (done) => {
    request(app)
      .delete(`/api/products/${createdProductId}`)
      .set('token', `Bearer ${validToken}`) // Use the validToken variable here
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('Product deleted');
        done();
      });
  });
});
