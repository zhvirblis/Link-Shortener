angular.module('shortener',["ngRoute"])
.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/', {templateUrl: 'pages/home.html', controller: HomeController})
		.when('/links', {templateUrl: 'pages/links.html', controller: LinksCtrl})
		.otherwise({
        	redirectTo: '/'
		});
	}]);
