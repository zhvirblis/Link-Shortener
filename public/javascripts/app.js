app=angular.module('shortener',["ngRoute"]);
app.config(['$routeProvider', '$locationProvider',function AppConfig($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {templateUrl: 'pages/home.html', controller: HomeController, title: 'Home'})
		.when('/list', {templateUrl: 'pages/list.html', controller: LinksCtrl,  title:'List'})
		.when('/not_found', {templateUrl: 'pages/not_found.html', title:'Page not found'})
		//.when('/my-links', {templateUrl: 'pages/mylinks.html', controller: LinksCtrl, title:'My links'})
		.otherwise({
        	redirectTo: '/not_found'
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