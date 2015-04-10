'use strict';

angular.module('mean.analytics').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('analytics example page', {
      url: '/analytics/example',
      templateUrl: 'analytics/views/index.html'
    });
  }
]);
