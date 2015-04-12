'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Analytics = new Module('analytics');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Analytics.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Analytics.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Analytics.menus.add({
    title: 'Analytics',
    link: 'Analytics',
    roles: ['authenticated'],
    menu: 'main'
  });
  Analytics.menus.add({
    title: 'Online',
    link: 'Online',
    roles: ['authenticated']
  });
  Analytics.menus.add({
    title: 'Trending Product',
    link: 'Trending Product',
    roles: ['authenticated']
  });
  Analytics.menus.add({
    title: 'Same Product',
    link: 'Same Product',
    roles: ['authenticated']
  });
  Analytics.menus.add({
    title: 'Active Cart',
    link: 'Active Cart',
    roles: ['authenticated']
  });
  
  Analytics.aggregateAsset('css', 'analytics.css');
  Analytics.aggregateAsset('css', 'AdminLTE.css');
  Analytics.aggregateAsset('css', 'pivot.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Analytics.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Analytics.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Analytics.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Analytics;
});
