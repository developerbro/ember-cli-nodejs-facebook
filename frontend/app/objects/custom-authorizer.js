export default Ember.SimpleAuth.Authorizers.Base.extend({
	authorize: function(jqXHR, requestOptions) {
		if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.authToken'))) {
			jqXHR.setRequestHeader('Authorization', 'auth_token ' + this.get('session.authToken'));
		}
	}
});
