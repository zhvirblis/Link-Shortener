function HomeController($scope, $http) {
  		$http({
  			method: "POST",
  			url: "login",
  			data: {
  				email:'yurock333@gmail.com',
          password:'4567hj',
          username:'Yurck'
  			}
  		}).then(function mySucces(response) {
        	$scope.jsonta = response.data;
    	}, function myError(response) {
        	$scope.jsonta = response.statusText;
    	});
    }
function LinksCtrl($scope) {
	$scope.shorter=[];
}