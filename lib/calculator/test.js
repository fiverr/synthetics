const { expect } = require('chai');
const Calculator = require('./');

describe('timing calculator', () => {
    it('Holds relevant constants on the constructor function', () => {
        expect(Calculator.NETWORK_EVENTS).to.deep.equal(['dns', 'tcp', 'request', 'response']);
        expect(Calculator.DOM_EVENTS).to.deep.equal(['interactive', 'content_loaded', 'dom_complete', 'load']);
    });

    const test = (start, end, method) => expect(
        new Calculator({
            [end]: 3,
            [start]: 1
        })[method]
    ).to.equal(2);

    /* eslint-disable no-multi-spaces */
    it('Calculates DNS timing',            () => test('domainLookupStart', 'domainLookupEnd',          'dns'));
    it('Calculates TCP timing',            () => test('connectStart',      'connectEnd',               'tcp'));
    it('Calculates request timing',        () => test('requestStart',      'responseStart',            'request'));
    it('Calculates response timing',       () => test('responseStart',     'responseEnd',              'response'));
    it('Calculates interactive timing',    () => test('domLoading',        'domInteractive',           'interactive'));
    it('Calculates content_loaded timing', () => test('domLoading',        'domContentLoadedEventEnd', 'content_loaded'));
    it('Calculates dom_complete timing',   () => test('domLoading',        'domComplete',              'dom_complete'));
    it('Calculates load timing',           () => test('domLoading',        'loadEventEnd',             'load'));
    it('Calculates gross network',         () => test('navigationStart',   'responseEnd',              'gross_network'));
    it('Calculates gross interactive',     () => test('navigationStart',   'domInteractive',           'gross_interactive'));
    it('Calculates gross load',            () => test('navigationStart',   'loadEventEnd',             'gross_load'));
    /* eslint-enable no-multi-spaces */
});
