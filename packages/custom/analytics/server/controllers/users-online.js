var fs = require('fs');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/acme';

module.exports.users_online= function(req, res,next) {

  res.send(200);

//  MongoClient.connect(url, function (err, db) {
//    if (err)
//      return err;
//    var current_timestamp = (new Date((new Date).getTime() - 900000)).toUTCString();
//
//    var match = {"$match": {"time": {"$gte": current_timestamp}, "event": {$ne: 'LogOut'}}};
//
//    var report_query = [match, {$group: {"_id": "$userId", "userId": {"$first": "$userId"}, "count": {"$sum": 1}}}, {$project: {"_id": 0, userId: 1}}, {"$sort": {"count": -1}}, {"$limit": 100}];
//    async.series([function (callback) {
//      db.collection("events").aggregate(report_query, function (err, results) {
//        var user_ids = [];
//        results.forEach(function (data) {
//          user_ids.push(data.userId);
//        })
//        callback(null, user_ids);
//      })
//    }], function (err, results) {
//      find_from_users(results[0]);
//    });
//    var find_from_users = function (results) {
//      async.series([function (callback) {
//        db.collection("users").aggregate([
//          {"$match": {"id": {$in: results}}},
//          {$project: {"name": 1, "email": 1, "gender": 1, "dob": 1, "pincode": 1, "_id": 0}}
//        ], function (err, results) {
//          callback(null, results);
//        })
//      }], function (err, results) {
//         res.send(results[0]);
//      })
//    }
//  })
};