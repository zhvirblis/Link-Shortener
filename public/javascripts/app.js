app=angular.module('shortener',["ngRoute"]);
app.config(['$routeProvider', '$locationProvider',function AppConfig($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {templateUrl: 'pages/home.html', controller: HomeController, title: 'Home'})
		.when('/list', {templateUrl: 'pages/list.html', controller: LinksCtrl, reloadOnSearch: false, title:'List'})
		.otherwise({
        	redirectTo: '/'
		});
		
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}]);

app.controller('authCtrl', AuthController);

app.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title+' | Link Shortener';
    });
}]);