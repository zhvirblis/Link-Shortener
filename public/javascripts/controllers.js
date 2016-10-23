function HomeController($scope, $http) {
  		$http({
  			method: "POST",
  			url: "api/link",
  			/*data: {
  				email:'yurock333@gmail.com',
          password:'4567hj',
          username:'Yurock'
  			}*/
        data:{
          newurl:'ghfgh',
          origin: 'https://example.com/'
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