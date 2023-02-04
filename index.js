const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const root = require('./main.controller');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
if (process.env.MONGO_URI === undefined) {
     console.log("MONGO_URI not found");
     process.exit(1);
}

//enable cors

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.connection.on('error', (err) => {
     console.log("MONGO ERROR: " + err);
     process.exit(1);
});

mongoose.connection.on('connected', () => {
     console.log("MONGO CONNECTED");
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use('/', root);

app.use(function (req, res, next) {
     console.log("404", req.url);
});

app.use(function (err, req, res, next) {
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};
     console.log(err);
     res.status(err.status || 500);
     res.render('error');
});

if (process.env.NODE_ENV === 'production') {
     app.listen(process.env.PORT);
}
else {
     app.listen(3000);
}

module.exports = app;
