import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	password       : '',
	passwordRepeat : '',
	actions: {
		changePassword: function() {
			var p = this.getProperties('password', 'passwordRepeat');
			if (!Em.isEmpty(p.password)&&p.password==p.passwordRepeat) {
				Em.$.post('api/v1/auth/password', p).done(function(res) {
					Notify.success('successfully changed!');
				}).fail(function(res) {
					Notify.alert('Cannot change password');
				});
				this.setProperties({password:'', passwordRepeat:''});
			} else {
				this.setProperties({password:'', passwordRepeat:''});
				Notify.warning('please enter same password!');
			}
		}
	}
});
