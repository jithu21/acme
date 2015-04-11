'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter


var controller= require('../controllers/acme-analytics')
module.exports = function(Analytics, app, auth, database) {

  app.get('/acme/fast_csv', auth.requiresLogin,controller.csv_stream);

  app.get('/acme/api/', auth.requiresLogin,controller.insert_one);

  app.get('/analytics/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/analytics/example/render', function(req, res, next) {
    Analytics.render('index', {
      package: 'analytics'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
