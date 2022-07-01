const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const NotFound = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validatorLogin, validatorUser } = require('./middlewares/joiValidate');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', validatorLogin, login);
app.post('/signup', validatorUser, createUser);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('*', auth, () => {
  throw new NotFound('Запрашиваемая страница не найдена');
});

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
