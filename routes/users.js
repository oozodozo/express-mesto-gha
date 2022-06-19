const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserInfo);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
