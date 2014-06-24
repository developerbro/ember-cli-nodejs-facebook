var express  = require('express');
var passport = require('passport');
var User     = require('../models/user');

module.exports = function(app) {
	var router = express.Router();
	router.route('/protected')
		.post(passport.authenticate('EmberAuth', {session: false}),
				function(req, res) {
					console.log(req.headers['api-userid']);
					res.send('ITS OKEY');
				});
	app.use('/api/v1', router);
};
