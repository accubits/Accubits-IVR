const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./modules/middleware/axiosLog');
const errorHandler = require('./utilities/errorHandler');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ivrRouter = require('./routes/ivr')
const numberRouter = require('./routes/number')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))


const auth = require('./config/local_auth')
auth.serializeUser()
auth.deserializeUser()
auth.configureStrategy()

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/ivr', ivrRouter);
app.use('/number', numberRouter);


app.use(errorHandler);
module.exports = app
