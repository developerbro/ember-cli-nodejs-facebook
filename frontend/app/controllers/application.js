export default Ember.ObjectController.extend({
	actions: {
		logout: function() {
			var self = this;
			Em.$.post('api/v1/auth/disconnect', {}).done(function(response) {
				self.get('session').invalidate();
			});
		}
	}
});
