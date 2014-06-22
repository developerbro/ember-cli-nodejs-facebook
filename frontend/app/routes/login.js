export default Ember.Route.extend({
	actions: {
		authenticateWithFacebook: function() {
			this.get('session').authenticate('authenticator:facebook', {});
		}
	}
});
