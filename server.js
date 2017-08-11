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
    .get(`${config.BASE_URL}/:type/:iso`, (req, res) => {
        const d = requestData(req);
        res.send(wrapHateOAS(getAll(d.type, d.iso), d.baseUrl));
    })
    .get(`${config.BASE_URL}/:type/:iso/systemid/:id`, (req, res) => {
        const d = requestData(req);
        const json = getOne(d.type, d.iso, req.params.id);
        json ? res.status(200).send(wrapHateOAS(json, d.baseUrl)) : res.status(404).send();
    })

    // Start server
    .listen(config.WEB_SERVER_PORT, function() {
        console.log('Started on port ' + config.WEB_SERVER_PORT);
    });

/**
 * Parse common data from the request object
 * 
 * @param {Request} req The Express HttpRequest object
 */
function requestData(req) {
    const port = config.WEB_SERVER_PORT !== 80 ? ':' + config.WEB_SERVER_PORT : '';
    const type = req.params.type;
    const iso  = req.params.iso;
    return { type: type, iso: iso, baseUrl: `${req.protocol}://${req.hostname}${port}${config.BASE_URL}/${type}/${iso}`, }
}
/**
 * Wrap a json object in a HateOAS structure
 * 
 * @param {Object} json A piece of json to wrap
 * @param {string} baseUrl The url forming the base of the request
 */
function wrapHateOAS(json, baseUrl) {
    function single(item) {
        item._links = { self: { href: `${baseUrl}/systemid/${item.systemId.identifikatorverdi}` } }
        return item;
    }
    if (Array.isArray(json)) {
        json = json.map(item => single(item));
        return {
            _embedded: { _entries: json },
            _links: { self: { href: `${baseUrl}` } },
            total_items: json.length
        }
    } 
    return single(json);
}

/**
 * Get the entire data from the iso standard
 * 
 * @param {string} type The iso category to fetch
 * @param {string} iso The name of the iso standard to fetch
 */
function getAll(type, iso) {
    const standard = isoMapper[iso];
    return JSON.parse(fs.readFileSync(`${__dirname}/kodeverk/${type}/${standard}.json`, 'utf-8'));
}

/**
 * Get one entry in the iso standard
 * 
 * @param {string} type The iso category to fetch
 * @param {string} iso The name of the iso standard to fetch
 * @param {string} id  The systemId of the entry in the standard
 */
function getOne(type, iso, id) {
    return getAll(type, iso).find(m => m.systemId.identifikatorverdi === id);
}
