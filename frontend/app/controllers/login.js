export default Ember.ObjectController.extend({
	email: '',
	password: '',
	actions: {
		login: function() {
			var u = this.getProperties('email', 'password');
			alert(u.email+' '+u.password);
			this.setProperties({'email': '', 'password':''});
			Em.$.post('api/v1/auth/login', u).done(function(response) {
				alert('OK');
			});
		}
	}
});
