function HomeController($scope) {
  
}
function LinksCtrl($scope, $http, $location) {
  $scope.links = [];
  $scope.search = null;
  $scope.sort = null;
  $scope.lastPage = null;
  $scope.paginator = [];

  var COUNT = 10;

  $scope.find = function(){
  $http({
        method: "GET",
        url: "/api/linklist",
          params: {
           search:$scope.search,
            sort:$scope.sort,
            tag:$location.search().tag,
            page:$location.search().page,
            count:COUNT
          },
        }).then(function mySucces(response) {
          $scope.links=response.data.links;
          $scope.lastPage=response.data.lastPage;
          //Create Paginator
          var current=$location.search().page;

          $scope.paginator = createPaginator(current, $scope.lastPage);
        }, function myError(response) {
          $scope.message = response.statusText;
        });
  }

  $scope.find();

  $scope.btnSearch = function(){
    $location.search('search', $scope.search);
    $location.search('page','1');
    $scope.find();
  }

  function createPaginator(current, last){
    
    // Current page
    if(!current){
        current=1;
    }
    // Array for paginator
    var paginator = [];
    if(current<5){
      for (var i = 1; i < current; i++) {
        paginator.push({number:i, class:'nonactive'});
      }
    }
    else{
      paginator.push({number:1, class:'nonactive'});
      paginator.push({number:'...', href:'#', class:'nonactive'});
      paginator.push({number:current-1});
    }
    paginator.push({number:current, class:'active'});
    if(last-current>4){
      paginator.push({number:parseInt(current)+1});
      paginator.push({number:'...', href:'#', class:'nonactive'});
      paginator.push({number:last, href:'#', class:'nonactive'});
    }
    else{
      console.log('Curent='+current+' lastPage='+last);
      for (var i = parseInt(current)+1; i <=last; i++) {
        paginator.push({number:i, class:'nonactive'});
        console.log('gf');
      }
    }

    return paginator;
}

  $scope.getHref = function (i){
    $location.search('page', i);
    $scope.find();
  }
}
function AuthController($scope, $http){
      //password:'4567hj',
      
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
          if(response.data.status=='ok') {
            location.reload();
          }
          if(response.data.status=='nonauth') {
            $scope.showWarning=true;
            $scope.message = response.data.message;
          }
          if(response.data.status=='error') {
            $scope.showDanger=true;
            $scope.message = response.data.message;
          }
        }, function myError(response) {
          $scope.showDanger=true;
          $scope.message = response.statusText;
        });
      }

      $scope.registration=function(){
        $http({
        method: "POST",
        url: "/signup",
        data: {
          password:$scope.reg.password,
          username:$scope.reg.username,
          email:$scope.reg.email
        }
        }).then(function mySucces(response) {
          if(response.data.status=='ok'){
            location.reload();
          }
          if(response.data.status=='nonauth') {
            $scope.showWarning=true;
            $scope.message = response.data.message;
          }
          if(response.data.status=='error') {
            $scope.showDanger=true;
            $scope.message = response.data.message;
          }
        }, function myError(response) {
          $scope.showDanger=true;
          $scope.message = response.statusText;
        });
      }
}