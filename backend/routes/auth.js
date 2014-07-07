var crypto  = require('crypto');
var express = require('express');
var request = require('request');
var User    = require('../models/user');

module.exports = function(app) {
	var router = express.Router();
	router.post('/auth/disconnect', function(req, res) {
		var userID = req.headers['api-userid'];
		User.findOne({facebookUserId: userID}, function(err, user) {
			if (err) res.send(404, 'not found');
			user.authToken = '';
			user.save(function(err) {
				res.send('logged out');
			});
		});
	});
	router.post('/auth/connect', function(req, res) {
		var accessToken = req.body.access_token;
		var path = 'https://graph.facebook.com/me?access_token='+accessToken;
		request(path, function(error, response, body) {
			var data = JSON.parse(body);
			if (!error && response && response.statusCode && response.statusCode == 200) {
				var u = {
					facebookUserId : data.id,
					username       : data.name,
					email          : data.email
				};
				User.findOne({facebookUserId: u.facebookUserId}, function(err, user) {
					if (err) res.send(401, 'error');
					if (!user) {
						user = new User({
							facebookUserId : u.facebookUserId,
							username       : u.username,
							email          : u.email,
							authToken      : crypto.randomBytes(20).toString('hex')
						});
					} else {
						user.facebookUserId = u.facebookUserId;
						user.username       = u.username;
						user.email          = u.email;
						user.authToken      = crypto.randomBytes(20).toString('hex');
					}
					user.save(function(err) {
						if (err) res.send(401, 'error');
						res.json(200, {user: user});
					});
				});
			} else {
				res.send(401, 'Not authorized');
			}
		});
	});
	router.post('/auth/login', function(req, res) {
		var email = req.body.email;
		var password = req.body.password;
		User.findOne({email: email}, function(err, user) {
			if (err) res.send(401, 'error');
			if (!user) {
				res.send(404, 'No such user');
			} else {
				user.authToken = crypto.randomBytes(20).toString('hex');
				user.save(function(err) {
					if (err) res.send(401, 'error');
					res.json(200, {user: user});
				});
			}
		});
	});

	app.use('/api/v1', router);
};
