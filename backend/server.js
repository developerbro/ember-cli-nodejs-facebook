var express               = require('express');
var bodyParser            = require('body-parser');
var mongoose              = require('mongoose');
var port                  = process.env.PORT || 8080;
var request               = require('request');
var crypto                = require('crypto');
var passport              = require('passport');
var EmberAuthStrategy     = require('passport-ember-auth').Strategy;

var globSync          = require('glob').sync;
var routes            = globSync('./routes/*.js', { cwd: __dirname}).map(require);

var FACEBOOK_APP_ID     = '1488191331398149',
	FACEBOOK_APP_SECRET = '62ab23fbeffd9d593083d82bd263f2e2';

mongoose.connect('mongodb://127.0.0.1:27017/test');

var User = require('./models/user');
function findByToken(token, fn) {
	User.findOne({authToken: token}, function(err, user) {
		if (err) return fn(null, null);
		return fn(null, user);
	});
}

var app = express();
app.use(bodyParser());
app.disable('etag');
app.use(passport.initialize());
passport.use(new EmberAuthStrategy({}, function(token, done) {
	process.nextTick(function() {
		findByToken(token, function(err, user) {
			if (err) return done(err);
			if (!user) return done(null, false);
			return done(null, user);
		});
	});
}));

app.get('/', function(req, res, next) {
  res.send('INDEX');
});

routes.forEach(function(route) { route(app); });

app.listen(port);
console.log('Magic is happening on port '+port);
