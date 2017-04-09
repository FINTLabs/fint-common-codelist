'use strict'

const config = require('./config');
const query = require('./mongoUtils');
const mongojs = require('mongojs');
const db = mongojs(config.ISO_DB);

db.on('error', function(err) {
    console.log('Database error', err);
});

db.on('connect', function() {
    console.log('Database connected: ' + config.ISO_DB);
});

const getISO31661alpha2List = function(callback) {
    db.iso31661alfa2.find(function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

const getISO31661alpha2Code = function(id, callback) {
    db.iso31661alfa2.find(query.getQueryDocument(id), function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

const getISO5218List = function(callback) {
    db.iso5218.find(function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

const getISO5218Code = function(id, callback) {
    db.iso5218.find(query.getQueryDocument(id), function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

const getISO6391alpha2List = function(callback) {
    db.iso6391alfa2.find(function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

const getISO6391alpha2Code = function(id, callback) {
    db.iso6391alfa2.find(query.getQueryDocument(id), function(err, docs) {
        docs.map(function(item) {
            delete item._id;
            return item;
        });
        callback(docs);
    });
};

module.exports = {
    getISO5218List,
    getISO5218Code,
    getISO31661alpha2List,
    getISO31661alpha2Code,
    getISO6391alpha2List,
    getISO6391alpha2Code
};