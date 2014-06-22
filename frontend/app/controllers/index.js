export default Ember.ObjectController.extend({
	actions: {
		authTest: function() {
			var self = this;
			Em.$.post('api/v1/protected', {}).done(function(response) {
				console.log(response);
			}).fail(function(response) {
				if (response.status==400) {
					self.transitionToRoute('login');
				}
			});
		}
	}
});
