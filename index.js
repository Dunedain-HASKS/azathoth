const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const root = require('./main.controller');
const mongoose = require('mongoose');
const app = express();

const env = require('dotenv').config();

if (process.env.MONGO_URI === undefined) {
     console.log("MONGO_URI not found");
     process.exit(1);
}
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,  });
mongoose.connection.on('error', (err) => {
     console.log("MONGO ERROR: " + err);
     process.exit(1);
});

mongoose.connection.on('connected', () => {
     console.log("MONGO CONNECTED");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', root);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
     next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error');
});

app.listen(3000);

module.exports = app;
