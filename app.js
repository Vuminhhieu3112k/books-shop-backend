var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var morgan = require('morgan')
var indexRouter = require('./routes/index');

var app = express();
var errorHandler = require('./middleware/error')
const systemConfig    = require( './configs/system');
const databaseConfig  = require('./configs/database');
// Local variable
app.locals.systemConfig = systemConfig;

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.4pg8w.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`,{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });
// view engine setup
app.use(cors())
app.use(morgan('tiny'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use(errorHandler)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.end('Error App');
// });

module.exports = app;
