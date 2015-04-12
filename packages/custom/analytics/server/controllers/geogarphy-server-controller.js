var fs = require('fs');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/acme';


module.exports.geography = function (req, res, next) {
  var req_query= req.query;
  var start=req_query.from;
  var end = req_query.to;
  MongoClient.connect(url, function (err, db) {
    if (err)
      return err;
    var match = {"$match": {"time": {"$gte": start, "$lte": end}}};

    var report_query = [match, {$group: {"_id": "$userId", "userId": {"$first": "$userId"}, "count": {"$sum": 1}}}, {$project: {"_id": 0, userId: 1}}, {"$sort": {"count": -1}}, {"$limit": 15}];

    async.series([function (callback) {
      db.collection("events").aggregate(report_query, function (err, results) {
        var user_ids = [];
        results.forEach(function (data) {
          user_ids.push(data.userId);
        });
        callback(null, user_ids);
      })
    }], function (err, results) {
      find_from_users(results[0]);
    });
    var find_from_users = function (results) {
      async.series([function (callback) {
        db.collection("users").aggregate([
          {"$match": {"id": {$in: results}}},
          {$project: {"pincode": 1, "_id": 0}}
        ], function (err, results) {
          var pincode_ids = [];
          results.forEach(function (data) {
            pincode_ids.push(data.pincode);
          });
          callback(null, pincode_ids);
        })
      }], function (err, results) {
        find_from_pincode(results[0])
      })
    };
    var find_from_pincode = function (results) {
      async.series([function (callback) {
      {
        db.collection("pincode").aggregate([{"$match":{"pincode":{$in:results}}},{"$group":{"_id":"$pincode", "pincode":{"$last":"$pincode"},"officename":{"$last":"$officename"},"regionname":{"$last":"$regionname"}, "circlename":{"$last":"$circlename"}, "Taluk":{"$last":"$Taluk"},"Districtname":{"$last":"$Districtname"},"statename":{"$last":"$statename"}}},{"$project":{"pincode":1,"officename":1,"regionname":1,"circlename":1,"Taluk":1,"Districtname":1,"statename":1 ,"_id":0}}], function(err, results){
          callback(null, results);
        })
      }
      }], function (err, results) {
        res.send(results[0]);
      })
    }
  })
};