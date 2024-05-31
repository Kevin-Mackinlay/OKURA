const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { createCart, updateCart, deleteCart, getUserCart, getAllCarts } = require('../controllers/cartController');

router.post('/', verifyTokenAndAuthorization, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);
router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);
router.get('/', verifyTokenAndAdmin, getAllCarts);

module.exports = router;
