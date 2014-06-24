export default Ember.ObjectController.extend({
	pathObserver: function() {
		console.log(this.get('currentPath'));
	}.observes('currentPath')
});
