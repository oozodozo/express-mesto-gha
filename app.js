const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { ERR_STATUS_NOT_FOUND } = require('./errors/constansErrorsStatus');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use((req, res) => res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден' }));

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.listen(PORT);
