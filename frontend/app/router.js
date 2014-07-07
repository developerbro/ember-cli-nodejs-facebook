import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FrontendENV.locationType
});

Router.map(function() {
	this.route('login');
	this.route('protected');
	this.route('profile');
});

export default Router;
