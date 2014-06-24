import FacebookAuthenticator from 'frontend/objects/facebook-authenticator';
import CustomAuthorizer from 'frontend/objects/custom-authorizer';

export default {
    name       : 'authentication',
    initialize : function(container, application) {
		var self = this;
		FB.init({appId: '1488191331398149'});
		container.register('authorizer:custom', CustomAuthorizer);
		container.register('authenticator:facebook', FacebookAuthenticator);
		Ember.SimpleAuth.setup(container, application, {
			authorizerFactory : 'authorizer:custom'
		});
		var applicationRoute = container.lookup('route:application');
		var session = container.lookup('ember-simple-auth-session:main');
		session.on('sessionAuthenticationSucceeded', function() {
			applicationRoute.transitionTo('index');
		});
		session.on('sessionAuthenticationFailed', function() {
			Ember.Logger.debug('Session authentication failed!');
		});
		session.on('sessionInvalidationSucceeded', function() {
			applicationRoute.transitionTo('index');
		});
		session.on('sessionInvalidationFailed', function() {
			Ember.Logger.debug('Session invalidation failed!');
		});
    }
};
