'use strict'

var getQueryDocument = function(q) {
    var queryDocument = {
        systemId: {
            identifikatorverdi: q
        }
    };
    return queryDocument;
};

module.exports = {
    getQueryDocument: getQueryDocument
};