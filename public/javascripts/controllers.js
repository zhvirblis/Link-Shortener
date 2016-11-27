function HomeController($scope) {

}
function LinksCtrl($scope, $http, $location) {

  $scope.newlink = {
    new: '',
    origin: '',
    tags: []
  };
  $scope.editlink = {
    new: '',
    origin: '',
    tags: []
  };

  $scope.links = [];
  $scope.search = $location.search().search;
  $scope.sort =  $location.search().sort;
  $scope.lastPage = null;
  $scope.paginator = [];
  var COUNT = 2;

  $scope.find = function() {
    $scope.my = $location.search().my;
    var params = {
      search: $scope.search,
      sort: $scope.sort,
      tag: $location.search().tag,
      page: $location.search().page,
      author: $location.search().my,
      count: COUNT
    };

    $http({
          method: 'GET',
          url: '/api/linklist',
          params: params,
        }).then(function mySucces(response) {
            $scope.links = response.data.links;
            $scope.lastPage = response.data.lastPage;
            //Create Paginator
            var current = $location.search().page;

            $scope.paginator = createPaginator(current, $scope.lastPage);
          }, function myError(response) {
            $scope.message = response.statusText;
          });
  };

  $scope.find();

  $scope.btnSearch = function() {
    $location.search('search', $scope.search);
    $location.search('page', '1');
    $location.search('sort', $scope.sort);
    $scope.find();
  };

  function createPaginator(current, last) {

    // Current page
    if (!current) {
      current = 1;
    }
    // Array for paginator
    var paginator = [];
    if (current < 5) {
      for (var i = 1; i < current; i++) {
        paginator.push({number: i, class: 'nonactive'});
      }
    } else {
      paginator.push({number: 1, class: 'nonactive'});
      paginator.push({number: '...', href: '#', class: 'nonactive'});
      paginator.push({number: current - 1});
    }
    paginator.push({number: current, class: 'active'});
    if (last - current > 4) {
      paginator.push({number: parseInt(current) + 1});
      paginator.push({number: '...', href: '#', class: 'nonactive'});
      paginator.push({number: last, href: '#', class: 'nonactive'});
    } else {
      console.log('Curent=' + current + ' lastPage=' + last);
      for (var i = parseInt(current) + 1; i <= last; i++) {
        paginator.push({number: i, class: 'nonactive'});
        console.log('gf');
      }
    }

    return paginator;
  }

  $scope.getHref = function(i) {
    $location.search('page', i);
    $scope.find();
  };

  $scope.addTag = function(newtag) {
    if (newtag) {
      $scope.newlink.tags.push(newtag);
    }
  };

  $scope.addEditTag = function(newtag) {
    if (newtag) {
      $scope.editlink.tags.push(newtag);
    }
  };

  $scope.delTag = function(x) {
    $scope.newlink.tags.splice(x, 1);
  };

  $scope.delEditTag = function(x) {
    $scope.editlink.tags.splice(x, 1);
  };

  $scope.sendLink = function() {
    $http({
        method: 'POST',
        url: '/api/link',
        data: {
          newurl: $scope.newlink.new,
          origin: $scope.newlink.origin,
          tags: $scope.newlink.tags
        }
      }).then(function mySucces(response) {
          if (response.data.status != 'ok') {
            $scope.linkMessage = response.data.message;
          }
          $scope.linkStatus = response.data.status;
        }, function myError(response) {
          $scope.linkMessage = response.statusText;
        });
    $scope.find();
  };

  $scope.delLink = function(id) {
    $http({
      method: 'DELETE',
      url: '/api/link/' + id,
    }).then(function mySucces(response) {
        if (response.data.status == 'ok') {
          $scope.find();
        } else {
          alert(response.data.message);
        }
      }, function myError(response) {
        alert(response.statusText);
      });
  };

  $scope.editLink = function(newurl, origin, tags) {
    $scope.editlinkid = newurl;
    $scope.editlink.new = newurl;
    $scope.editlink.origin = origin;
    $scope.editlink.tags = tags;
  };

  $scope.sendEditLink = function() {
    $http({
        method: 'PUT',
        url: '/api/link/' + $scope.editlinkid,
        data: {
          newurl: $scope.editlink.new,
          origin: $scope.editlink.origin,
          tags: $scope.editlink.tags
        }
      }).then(function mySucces(response) {
          if (response.data.status == 'ok') {
            $scope.find();
          } else {
            alert(response.data.message);
          }
        }, function myError(response) {
          alert(response.statusText);
        });
  };

  $scope.monthStat = Array(30);

  $scope.getStatistic = function() {
    var dayInMiliseconds = 24 * 60 * 60 * 1000;
    var current = new Date();
    $scope.monthStat.fill(0);
    $scope.countViews = 0;
    $http({
        method: 'GET',
        url: '/api/linklist',
        params: {
          author: true
        }
      }).then(function mySucces(response) {
          for (var i = 0; i < response.data.links.length; i++) {
            $scope.countViews += response.data.links[i].views.length;
            for (var j = 0; j < response.data.links[i].views.length; j++) {
              var date1 = new Date(response.data.links[i].views[j]);
              if (daysBeforeToday(date1, current) < 31) {
                $scope.monthStat[29 - daysBeforeToday(date1, current)]++;
              }
            }
          }
          $scope.seven = $scope.monthStat.slice(23);
          console.log($scope.monthStat);
          console.log($scope.seven);
          $scope.createChart($scope.seven);
        }, function myError(response) {
          alert(response.statusText);
        });
  };

  $scope.createChart = function(data) {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: daysForChart(data.length),
        datasets: [{
          label: 'Last ' + data.length + ' days',
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data: data
        }]
      }
    });
  };

  $scope.getStatisticByOne = function(views) {
    var current = timeToZero(new Date);
    $scope.monthStat.fill(0);
    $scope.countViews = views.length;
    for (var j = 0; j < views.length; j++) {
      var date1 = new Date(views[j]);
      if (daysBeforeToday(date1, current) < 31) {
        $scope.monthStat[29 - daysBeforeToday(date1, current)]++;
      }
    }
    $scope.seven = $scope.monthStat.slice(23);
    $scope.createChart($scope.seven);
  };

  function daysForChart(count) {
    var dayInMiliseconds = 24 * 60 * 60 * 1000;
    var labels = [];
    var current = timeToZero(new Date);
    for (var i = 0; i < count; i++) {
      var toLabels = current - (count - i - 1) * dayInMiliseconds;
      toLabels = new Date(toLabels);
      labels.push(toLabels.getDate() + '.' + toLabels.getMonth());
    }
    return labels;
  }

  function daysBeforeToday(date1, date2) {
    var dayInMiliseconds = 24 * 60 * 60 * 1000;

    date1 = timeToZero(date1);
    date2 = timeToZero(date2);
    var difference = date2 - date1;
    return difference / dayInMiliseconds;
  }

  function timeToZero(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

}

function AuthController($scope, $http) {
  //password:'4567hj',

  $scope.showWarning = false;
  $scope.logout = function() {
    $http({
      method: 'GET',
      url: '/logout',
    }).then(function mySucces(response) {
      location.reload();
    }, function myError(response) {
      $scope.message = response.statusText;
    });
  };
  $scope.login = function() {
    $http({
      method: 'POST',
      url: '/login',
      data: {
        password: $scope.password,
        username: $scope.username
      }
    }).then(function mySucces(response) {
      if (response.data.status == 'ok') {
        location.reload();
      }
      if (response.data.status == 'nonauth') {
        $scope.showWarning = true;
        $scope.message = response.data.message;
      }
      if (response.data.status == 'error') {
        $scope.showDanger = true;
        $scope.message = response.data.message;
      }
    }, function myError(response) {
      $scope.showDanger = true;
      $scope.message = response.statusText;
    });
  };

  $scope.registration = function() {
    if($scope.regconfpassword==$scope.regpassword){
    $http({
      method: 'POST',
      url: '/signup',
      data: {
        password: $scope.regpassword,
        username: $scope.regusername,
        email: $scope.regemail
      }
    }).then(function mySucces(response) {
      if (response.data.status == 'ok') {
        location.reload();
      }
      if (response.data.status == 'nonreg') {
        console.log("gfdfg");
        $scope.showRegWarning = true;
        $scope.message = response.data.message;
      }
      if (response.data.status == 'error') {
        $scope.showRegDanger = true;
        $scope.message = response.data.message;
      }
    }, function myError(response) {
      $scope.showRegDanger = true;
      $scope.message = response.statusText;
      });
    }else{
      $scope.showRegWarning = true;
      $scope.message = 'Check passwords';
    }
  };
}
