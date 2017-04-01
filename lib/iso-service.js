'use strict'

var config = require('./config');
var mongojs = require('mongojs')
var db = mongojs(config.ISO_DB);

db.on('error', function(err) {
    console.log('database error', err);
});

db.on('connect', function() {
    console.log('database connected');
});

db.runCommand({ ping: 1 }, function(err, res) {
    if (!err && res.ok) console.log('we\'re up')
});

var iso3166 = db.collection('iso3166_1_alfa2');

db.iso3166.find(function(err, docs) {
    console.log('docs: ' + docs);
    console.log('err: ' + err);
    //callback('docs');
});

var getISO31661alpha2 = function(callback) {
    var iso3166 = db.collection('iso3166_1_alfa2');

    db.iso3166.find(function(err, docs) {
        console.log('docs: ' + docs);
        console.log('err: ' + err);
        //callback('docs');
    });
}

var getISO5218 = function() {
    return [{}];

}

var getISO639 = function() {
    return [{}];
}

var getISO639 = function() {
    return [{}];
}

module.exports = {
    getISO5218: getISO5218,
    getISO31661alpha2: getISO31661alpha2,
    getISO639: getISO639
};