const router = require('express').Router();

const {
  getUser,
  getAllUsers,
  updateUser,
  updatePass,
  updateUserAdmin,
  updateUserLang,
  deleteUser,
} = require('../controllers/users');

const {
  userIdValidation,
  updateUserValidation,
  updateUserAdminValidation,
  updateUserLangValidation,
  updateUserPassValidation,
} = require('../middlewares/validation/userValidation');

router.get('/me', getUser);
router.get('/', getAllUsers);
router.patch('/:userId', userIdValidation, updateUserValidation, updateUser);
router.patch('/admin/:userId', updateUserAdminValidation, updateUserAdmin);
router.patch('/me/lang', updateUserLangValidation, updateUserLang);
router.patch('/pass/:userId', userIdValidation, updateUserPassValidation, updatePass);
router.delete('/:userId', userIdValidation, deleteUser);

module.exports = router;