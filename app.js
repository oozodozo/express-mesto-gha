const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { ERR_STATUS_NOT_FOUND } = require('./errors/constansErrorsStatus');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '62a1210bb5bd5e50da558fbe',
  };
  next();
});
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use((req, res) => res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден' }));

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.listen(PORT);
