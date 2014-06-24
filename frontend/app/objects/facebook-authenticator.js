export default Ember.SimpleAuth.Authenticators.Base.extend({
		restore: function(properties) {
			return new Ember.RSVP.Promise(function(resolve, reject) {
				if (!Ember.isEmpty(properties.accessToken)) {
					resolve(properties);
				} else {
					reject();
				}
			});
		},
	   	authenticate: function() {
		   return new Ember.RSVP.Promise(function(resolve, reject) {
			   FB.getLoginStatus(function(fbResponse) {
				   if (fbResponse.status === 'connected') {
					   Ember.run(function() {
						   Em.$.post('api/v1/auth/connect', {
							   'access_token' : fbResponse.authResponse.accessToken
						   }).done(function(response) {
							   console.log(response);
							   resolve({ 
								   accessToken : fbResponse.authResponse.accessToken,
								   userID      : fbResponse.authResponse.userID,
								   authToken   : response.user.authToken,
								   username    : response.user.username,
								   email       : response.user.email
							   });
						   });
					   });
				   } else if (fbResponse.status === 'not_authorized') {
					   reject();
				   } else {
					   FB.login(function(fbResponse) {
						   if (fbResponse.authResponse) {
							   Ember.run(function() {
								   Em.$.post('api/v1/auth/connect', {
									   'access_token' : fbResponse.authResponse.accessToken
								   }).done(function(response) {
									   console.log(response);
									   resolve({ 
										   accessToken : fbResponse.authResponse.accessToken,
										   userID      : fbResponse.authResponse.userID,
										   authToken   : response.user.authToken,
										   username    : response.user.username,
										   email       : response.user.email
									   });
								   });
							   });
						   } else {
							   reject();
						   }
					   }, {
						   perms: 'email'
					   });
				   }
			   });
		   });
	   },
	   invalidate: function() {
		   return new Ember.RSVP.Promise(function(resolve, reject) {
			   FB.logout(function(response) {
				   Ember.run(resolve);
			   });
		   });
	   }
});
