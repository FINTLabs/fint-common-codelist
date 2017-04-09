import test from 'ava';
import mongoUtils from './mongoUtils';

test('Get query document', t => {
    const queryDocument = mongoUtils.getQueryDocument('123');
    t.is(queryDocument.systemId.identifikatorverdi, '123');
});