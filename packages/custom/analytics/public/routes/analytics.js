'use strict';

angular.module('mean.analytics').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('Analytics', {
      url: '/analytics/example',
      templateUrl: 'analytics/views/index.html'
    });
  }
]);
