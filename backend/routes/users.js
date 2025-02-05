const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

const {
  validateProfileUpdate,
  validateAvatarUpdate,
  validateUserId
} = require('../middleware/validations');

const auth = require('../middleware/auth');


router.get('/me', auth, getCurrentUser);
router.patch('/me', validateProfileUpdate, updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;