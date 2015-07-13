'strict';

var express = require('express');
var http = require('http'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');


var db = require('./model/db');  
var app = express();

//assign the ejs engine to .html files
//set .html as the default extension
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//for mongostore session
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'cat in the hat',
    saveUninitialized: false, //don't create session until something stored 
    resave: false, //don't save session if unmodified
    store: new MongoStore({
	db: 'Mongosession',
	touchAfter: 24 * 3600 //time period in seconds 
 	})
}));

//routes setup
var route = require('./routes/routes.js').routeHandler(app);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//dev error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'), function(){ //for debug only
console.log('HTTPS server listening on port ' + app.get('port'));
});


