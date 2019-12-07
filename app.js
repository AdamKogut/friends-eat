var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

var indexRouter = require('./routes/index');
const keys = require('./SecretKeys/Keys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var whitelist = ['http://localhost:3000', 'https://friends-eat.herokuapp.com', 'https://www.bottomsup.me', undefined]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(()=>{
        console.log(origin)
        return new Error('Not allowed by CORS:'+origin)
      })
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);

if(process.env.NODE_ENV=='production'){
  // render the error page
  app.use(express.static('client/build'));
  const path = require('path')
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
  })
}
module.exports = app;