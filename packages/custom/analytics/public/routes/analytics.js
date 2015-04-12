'use strict';

angular.module('mean.analytics').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('Analytics', {
      url: '/analytics/example',
      templateUrl: 'analytics/views/index.html'
    });
    $stateProvider.state('Online', {
      url: '/analytics/online',
      templateUrl: 'analytics/views/users-online.html'
    });

    $stateProvider.state('Trending Product', {
      url: '/analytics/trending_product',
      templateUrl: 'analytics/views/trending-product.html'
    });

    $stateProvider.state('Same Product', {
      url: '/analytics/same_product',
      templateUrl: 'analytics/views/same-product.html'
    });

    $stateProvider.state('Active Cart', {
      url: '/analytics/active_cart',
      templateUrl: 'analytics/views/active_cart.html'
    });

  }
]);
