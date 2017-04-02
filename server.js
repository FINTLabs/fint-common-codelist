var express = require('express');
var app = express();
var config = require('./lib/config');
var isoService = require('./lib/isoService');


app.get(config.ISO_BASE_URL + '/31661alpha2', function(request, response) {
    try {
        console.log('Getting ISO 3166-1 alpha2 list');
        isoService.getISO31661alpha2List(function(codes) {
            response.send(codes);
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.ISO_BASE_URL + '/31661alpha2/systemid/:id', function(request, response) {
    try {
        console.log('Getting ISO 3166-1 alpha2 code');
        isoService.getISO31661alpha2Code(request.params.id, function(codes) {
            if (codes.length == 1) {
                response.send(codes[0]);
            } else {
                response.status(404).send();
            }
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.ISO_BASE_URL + '/6391alpha2', function(request, response) {
    try {
        console.log('Getting ISO 639-1 alpha2 list');
        isoService.getISO6391alpha2List(function(codes) {
            response.send(codes);
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.ISO_BASE_URL + '/6391alpha2/systemid/:id', function(request, response) {
    try {
        console.log('Getting ISO 639-1 alpha2 code');
        isoService.getISO6391alpha2Code(request.params.id, function(codes) {
            if (codes.length == 1) {
                response.send(codes[0]);
            } else {
                response.status(404).send();
            }
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.ISO_BASE_URL + '/5218', function(request, response) {
    try {
        console.log('Getting ISO 5218 list');
        isoService.getISO5218List(function(codes) {
            response.send(codes);
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.ISO_BASE_URL + '/5218/systemid/:id', function(request, response) {
    try {
        console.log('Getting ISO 5218 code');
        isoService.getISO5218Code(request.params.id, function(codes) {
            if (codes.length == 1) {
                response.send(codes[0]);
            } else {
                response.status(404).send();
            }
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});


app.listen(config.WEB_SERVER_PORT, function() {
    console.log('Started on port ' + config.WEB_SERVER_PORT);
});