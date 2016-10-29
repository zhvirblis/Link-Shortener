angular.module('shortener',["ngRoute"])
.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/', {templateUrl: 'template/home', controller: HomeController})
		.when('/links', {templateUrl: 'pages/links.html', controller: LinksCtrl})
		.otherwise({
        	redirectTo: '/'
		});
	}]);
