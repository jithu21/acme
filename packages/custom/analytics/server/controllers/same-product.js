var fs = require('fs');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/acme';


module.exports.same_product= function(req, res, next) {
  var req_query= req.query;
  var start=req_query.from;
  var end = req_query.to;
  MongoClient.connect(url, function (err, db) {
    if (err)
      return err;
    var match = {"$match": {"time": {"$gte": start, "$lte":end},"sku":{"$exists":true}}};
    var report_query = [match, {$group: {"_id": {"sku" : "$sku"}, "sku": {"$first": "$sku"}, "count": {"$sum": 1}}}, {$project: {"_id": 0, sku: 1}}, {"$sort": {"count": -1}}, {"$limit": 15}];
    async.series([function (callback) {
      db.collection("events").aggregate(report_query, function (err, results) {
        var product_ids = [];
        results.forEach(function (data) {
          product_ids.push(data.sku);
        });
        callback(null, product_ids);
      })
    }], function (err, results) {
      find_from_product(results[0]);
    });
    var find_from_product = function (results) {
      async.series([function (callback) {
        db.collection("product").aggregate([
          {"$match": {"sku": {$in: results}}},
          {"$group": {"_id": "$sku", "Name": {"$last": "$Name"}, "price": {"$last": "$price"}, "categories": {"$last": "$categories"}, "brand": {"$last": "$brand"}, "Description": {"$last": "$Description"}}},
          {$project: {Name: 1, price: 1, categories: 1, brand: 1, Description: 1, "_id": 0}}
        ], function (err, results) {
          callback(null, results);
        })
      }], function (err, results) {
          res.send(results[0])
      })
    };
  });
};