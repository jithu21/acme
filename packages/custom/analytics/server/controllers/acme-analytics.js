var fs = require('fs');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var exec = require('exec');

var url = 'mongodb://localhost:27017/acme';

module.exports.geography= function(req, res, next)
{
  MongoClient.connect('mongodb://127.0.0.1:27017/acme', function(err, db) {
    if (err) throw err;

    db.collection('events').aggregate(full_event, function (err, records) {
      if (err) throw err;
      res.send("200");
    });
  })
};

module.exports.insert_one= function(req, res, next)
{
  var req_query = req.query;
   var full_event={time:req_query.time, userId:req_query.user_id,event:req_query.event, eventType:req_query.event_type, sku:req_query.product_id, price:req_query.price,searchString:req_query.phrase, orderId:req_query.order_id};
  MongoClient.connect('mongodb://127.0.0.1:27017/acme', function(err, db) {
    if (err) throw err;
    db.collection('events').insert(full_event, function (err, records) {
      if (err) throw err;
      res.send("200");
    });
  })
};

module.exports.csv_stream= function(req, res, next) {
  var csv = require("fast-csv");

  function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }
  var results = getFiles("files/public/photos");
  results.forEach(function (data) {
    if (data.indexOf(".csv") > 0) {
      exec(['mongoimport', '-d', 'acme', '-c', 'events', '--type', 'csv', '--file', data, '--headerline'], function (err, out, code) {
        if (err instanceof Error)
          throw err;
        process.stderr.write(err);
        process.stdout.write(out);
      });
    }
  });
  res.send("200");
};




