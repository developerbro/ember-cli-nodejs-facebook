export default Ember.ObjectController.extend({
	actions: {
		authTest: function() {
			Em.$.post('api/v1/protected', {}).done(function(response) {
				console.log(response);
			});
		}
	}
});
