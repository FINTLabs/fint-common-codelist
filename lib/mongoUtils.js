'use strict'

const getQueryDocument = (q) => {
    return {
        systemId: {
            identifikatorverdi: q
        }
    };
};

module.exports = {
    getQueryDocument
};