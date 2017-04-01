'use strict'

module.exports = {
    WEB_SERVER_PORT: process.env.WEB_SERVER_PORT || 8000,
    ISO_BASE_URL: process.env.ISO_BASE_URL || '/felles/kodeverk/iso',
    KS_BASE_URL: process.env.KS_BASE_URL || '/felles/kodeverk/ks',
    ISO_DB: process.env.ISO_DB || 'mongodb://127.0.0.1:27017/iso'
}