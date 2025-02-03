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

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', validateProfileUpdate, updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);
router.get('/me', auth, getCurrentUser);

module.exports = router;