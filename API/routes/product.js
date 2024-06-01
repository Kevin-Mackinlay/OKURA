const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productController');

// Routes
router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);
router.get('/find/:id', getProduct);
router.get('/', getAllProducts);

module.exports = router;
