import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	actions: {
		logout: function() {
			var self = this;
			Em.$.post('api/v1/auth/disconnect', {}).always(function(response) {
				Notify.warning('logout');				
				localStorage.clear();
				self.get('session').invalidate();
				location.reload();
			});
		}
	}
});
