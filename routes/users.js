const usersRouter = require('express').Router();
const { validatorUserId, validatorAboutUser, validatorAvatar } = require('../middlewares/joiValidate');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', validatorUserId, getUserById);
usersRouter.get('/me', validatorUserId, getCurrentUser);
usersRouter.patch('/me', validatorAboutUser, updateUserInfo);
usersRouter.patch('/me/avatar', validatorAvatar, updateUserAvatar);

module.exports = usersRouter;
