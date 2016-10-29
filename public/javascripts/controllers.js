function HomeController($scope, $http) {
  		/*$http({
  			method: "POST",
  			url: "/login",
  			data: {
  				email:'yurock333@gmail.com',
          password:'4567hj',
          username:'Yurock'
  			}
  		}).then(function mySucces(response) {
        	$scope.jsonta = response.data;
    	}, function myError(response) {
        	$scope.jsonta = response.statusText;
    	});*/
      $scope.showWarning=false;
      $scope.logout=function(){
        $http({
        method: "GET",
        url: "/logout",
        }).then(function mySucces(response) {
          location.reload();
        }, function myError(response) {
          $scope.message = response.statusText;
        });
      }
      $scope.login=function(){
        $http({
        method: "POST",
        url: "/login",
        data: {
          password:$scope.password,
          username:$scope.username
        }
        }).then(function mySucces(response) {
          if(response.data.status=='ok'){
            location.reload();
          }
          if(response.data.status=='nonauth'){
            $scope.showWarning=true;
            $scope.message = response.data.message;
          }
          if(response.data.status=='error'){
            $scope.showDanger=true;
            $scope.message = response.data.message;
          }
        }, function myError(response) {
          $scope.showDanger=true;
          $scope.message = response.statusText;
        });
      }
    }
function LinksCtrl($scope) {
	$scope.shorter=[];
}