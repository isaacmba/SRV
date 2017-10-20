app.factory('linkedin',['$http','$state', function($http,$state){
	var user = {};

	user.login = function(){
		console.log('in service');
		return $http.get('/auth/linkedin').then(function(user){
			console.log(user);
			user.data = user;

			$state.go('profile');

		})
	}
	return user;
}]);