
angular.module('mean.analytics').filter('Modified_date', function() {
  return function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };
});


angular.module('mean.analytics').controller('UsersOnlineController', ['$scope', '$http', 'Global', 'Analytics',
  function ($scope, $http, Global, Analytics) {
    $scope.user_usage= function() {
      $scope.mask = $http({
        method: 'GET',
        url: '/acme/online?hell="gupta"',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description'}
      }).success(function (result) {
        var result=[ { email: '82c0c43e@gainsighttest.com',
          gender: 'M',
          pincode: 742101,
          dob: '1979-04-01T18:21:03.799Z',
          name: 'User - 24201' },
          { email: '7575ad39@gainsighttest.com',
            gender: 'M',
            pincode: 689101,
            dob: '1980-03-24T19:49:11.500Z',
            name: 'User - 503521' },
          { email: '3f2038cf@gainsighttest.com',
            gender: 'F',
            pincode: 673121,
            dob: '1985-09-12T04:19:25.333Z',
            name: 'User - 232043' },
          { email: 'd7bb8e23@gainsighttest.com',
            gender: 'F',
            pincode: 534350,
            dob: '1989-12-22T01:24:51.026Z',
            name: 'User - 729192' },
          { email: '61cd4a74@gainsighttest.com',
            gender: 'F',
            pincode: 462001,
            dob: '1986-01-13T12:05:48.571Z',
            name: 'User - 221598' },
          { email: 'b47be992@gainsighttest.com',
            gender: 'M',
            pincode: 680503,
            dob: '1978-11-30T03:14:18.824Z',
            name: 'User - 512358' },
          { email: 'd5724be7@gainsighttest.com',
            gender: 'M',
            pincode: 577501,
            dob: '1979-02-09T07:37:28.247Z',
            name: 'User - 434388' },
          { email: '8e05bceb@gainsighttest.com',
            gender: 'M',
            pincode: 625513,
            dob: '1982-01-12T06:53:28.892Z',
            name: 'User - 703535' },
          { email: '0c00fd37@gainsighttest.com',
            gender: 'F',
            pincode: 457661,
            dob: '1975-06-22T19:38:34.388Z',
            name: 'User - 914693' },
          { email: '50c5a677@gainsighttest.com',
            gender: 'M',
            pincode: 560032,
            dob: '1977-03-04T04:07:15.507Z',
            name: 'User - 950474' },
          { email: '7ea0ae34@gainsighttest.com',
            gender: 'F',
            pincode: 506167,
            dob: '1992-01-19T17:08:26.862Z',
            name: 'User - 219770' },
          { email: '51e46532@gainsighttest.com',
            gender: 'F',
            pincode: 676505,
            dob: '1984-12-10T01:02:29.476Z',
            name: 'User - 121578' },
          { email: 'd9e5f834@gainsighttest.com',
            gender: 'M',
            pincode: 713101,
            dob: '1992-06-11T00:52:30.669Z',
            name: 'User - 521863' },
          { email: '05fd820d@gainsighttest.com',
            gender: 'F',
            pincode: 182101,
            dob: '1975-10-18T17:18:45.284Z',
            name: 'User - 589760' } ];
        if(result.length >0){
          $scope.totals_table=result || [];
          $scope.info_data=false;
        }else
        {
          $scope.info_data=true;
        }
      }).error(function (data, status, headers, config) {
        $scope.status_code = status;
        $scope.info_error = false;
        $scope.info_data = true;
      });
    };
    $scope.global = Global;
    $scope.package = {
      name: 'analytics'
    };
  }]);

