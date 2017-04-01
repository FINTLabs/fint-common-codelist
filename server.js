var express = require('express');
var app = express();
var config = require('./lib/config');
var isoService = require('./lib/iso-service');


app.get(config.ISO_BASE_URL + '/3166-1_alpha2', function(request, response) {
    try {
        response.send(isoService.getISO31661alpha2());
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get(config.KS_BASE_URL, function(request, response) {
    try {
        response.send(JSON.stringify('KS'));
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

//app.use(express.static('server/public'));

app.listen(config.WEB_SERVER_PORT, function() {
    console.log('Started on port ' + config.WEB_SERVER_PORT);
});