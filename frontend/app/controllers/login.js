import CustomAuthorizer from 'frontend/objects/custom-authorizer';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	email    : '',
	password : '',
	actions: {
		login: function() {
			var self = this;
			var u = this.getProperties('email', 'password');
			this.setProperties({'email': '', 'password':''});
			Em.$.post('api/v1/auth/login', u).done(function(response) {
				var u = response.user;
				console.log(u);
				self.get('session').setProperties({
					isAuthenticated : true,
					authToken       : u.authToken,
					userID          : u.facebookUserId,
					username        : u.username,
					email           : u.email
				});
				localStorage.setItem('ember_simple_auth:authToken'           , u.authToken);
				localStorage.setItem('ember_simple_auth:email'               , u.email);
				localStorage.setItem('ember_simple_auth:userID'              , u.facebookUserId);
				localStorage.setItem('ember_simple_auth:username'            , u.username);

				Em.$.ajaxPrefilter(function(options, oriOptions, jqXHR) {
					try{
						CustomAuthorizer.authorize(jqXHR, options);
					}catch(e) {}
				});
				self.transitionToRoute('profile');
				Notify.success('successfully logged in');
			});
		}
	}
});
