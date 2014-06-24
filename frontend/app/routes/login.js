export default Ember.Route.extend({
	activate: function() {
		if (this.get('session.isAuthenticated'))
			this.transitionTo('index');
	},
	actions: {
		authenticateWithFacebook: function() {
			this.get('session').authenticate('authenticator:facebook', {});
		}
	}
});
