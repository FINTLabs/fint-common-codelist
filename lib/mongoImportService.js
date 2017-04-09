'use strict'

const mongojs = require('mongojs');
const config = require('./config');
const isoDb = mongojs(config.ISO_DB);
const dir = require('node-dir');
const path = require('path');

isoDb.on('error', function(err) {
    console.log('Database error', err);
});

isoDb.on('connect', function() {
    console.log('Database connected: ' + config.ISO_DB);
});

isoDb.on('close', function() {
    console.log('Database connection closed: ' + config.ISO_DB);
});

isoDb.runCommand({ ping: 1 }, function(err, res) {
    if (!err && res.ok) console.log('This is nice ;) We got connection with: ' + config.ISO_DB);
});

const importISOCodeLists = function() {
    isoDb.dropDatabase();
    dir.readFiles(__dirname + '/../kodeverk/iso/', {
            match: /.json$/,
            exclude: /^\./
        }, function(err, content, filename, next) {
            if (err) throw err;
            console.log('Importing file: ', path.basename(filename));
            const collectionName = path.basename(filename).split('.')[0].replace(/_/g, '');
            const collection = isoDb.collection(collectionName);
            const isoCodeList = JSON.parse(content);
            if (Array.isArray(isoCodeList)) {
                collection.save(isoCodeList);
            } else {
                console.log('not an array');
            }
            next();
        },
        function(err, files) {
            console.log('Finish importing ISO codelists');
            isoDb.close();

            if (err) throw err;
        }
    );
};

module.exports = {
    importISOCodeLists
};