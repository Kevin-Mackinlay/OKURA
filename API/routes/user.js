const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats, uploadProfileImage } = require('../controllers/userController');
const upload = require('../uploads/multer')

router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/find/:id', verifyTokenAndAdmin, getUser);
router.get('/', verifyTokenAndAdmin, getAllUsers);
router.get('/stats', verifyTokenAndAdmin, getUserStats);
router.post('/:id/profile-image', verifyTokenAndAuthorization, upload.single('image'), uploadProfileImage);

module.exports = router;
