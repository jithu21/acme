'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter


var controller= require('../controllers/acme-analytics');
var controller_geography=require('../controllers/geogarphy-server-controller.js');
var controller_usersonline=require('../controllers/users-online.js');
var controller_trending=require('../controllers/trending-product.js');
var controller_same_product=require('../controllers/same-product.js');
module.exports = function(Analytics, app, auth, database) {

  app.get('/acme/fast_csv', auth.requiresLogin,controller.csv_stream);

  app.get('/acme/api/', auth.requiresLogin,controller.insert_one);

  app.get('/acme/geography/', auth.requiresLogin,controller_geography.geography);

  app.get('/acme/online/', auth.requiresLogin,controller_usersonline.users_online);

  app.get('/acme/trending_products/', auth.requiresLogin,controller_trending.trending_product);

  app.get('/acme/same_products/', auth.requiresLogin,controller_same_product.same_product);
};
