const fs = require('fs');
const cors = require('cors');
const express = require('express');

// Read configuration
const config = {
    WEB_SERVER_PORT: process.env.WEB_SERVER_PORT || 8000,
    BASE_URL       : process.env.BASE_URL || '/felles/kodeverk'
}
const isoMapper = {
    '31661alpha2': 'iso_3166_1_alfa_2',
    '6391alpha2' : 'iso_639_1_alfa_2',
    '5218'       : 'iso_5218'
}

// Create express application
express()
    .use(cors())

    // Setup endpoints
    .get(`${config.BASE_URL}/:type/:iso`, (req, res) => res.send(getAll(req.params.type, req.params.iso)))
    .get(`${config.BASE_URL}/:type/:iso/system/:id`, (req, res) => {
        const json = getOne(req.params.type, req.params.iso, req.params.id);
        return (json ? res.status(200).send(json) : res.status(404).send());
    })

    // Start server
    .listen(config.WEB_SERVER_PORT, function() {
        console.log('Started on port ' + config.WEB_SERVER_PORT);
    });


/**
 * Get the entire data from the iso standard
 * 
 * @param {string} type The iso category to fetch
 * @param {string} iso The name of the iso standard to fetch
 */
function getAll(type, iso) {
    const standard = isoMapper[iso];
    return fs.readFileSync(`${__dirname}/kodeverk/${type}/${standard}.json`, 'utf-8');
}

/**
 * Get one entry in the iso standard
 * 
 * @param {string} type The iso category to fetch
 * @param {string} iso The name of the iso standard to fetch
 * @param {string} id  The systemId of the entry in the standard
 */
function getOne(type, iso, id) {
    return JSON.parse(getAll(type, iso)).find(m => m.systemId.identifikatorverdi === id);
}
