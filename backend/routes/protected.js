var express  = require('express');
var passport = require('passport');

module.exports = function(app) {
	var router = express.Router();
	router.route('/protected')
		.post(passport.authenticate('EmberAuth', {session: false}),
				function(req, res) {
					res.send('ITS OKEY');
				});
	app.use('/api/v1', router);
};
