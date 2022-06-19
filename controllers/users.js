const bcrypt = require('bcrypt');
const User = require('../models/user');
const {
  ERR_STATUS_BAD_REQUEST, ERR_STATUS_NOT_FOUND, ERR_STATUS_DEFAULT,
} = require('../utils/constansErrorsStatus');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
          return;
        }
        res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar,
};
