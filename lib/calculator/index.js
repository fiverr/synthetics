const NETWORK_EVENTS = ['dns', 'tcp', 'request', 'response'];
const DOM_EVENTS = ['interactive', 'content_loaded', 'dom_complete', 'load'];
const GROSS_EVENTS = ['gross_network', 'gross_interactive', 'gross_load'];

module.exports = class Calculator {
    constructor(timing) {
        this.timing = timing;
    }

    static get NETWORK_EVENTS() {
        return NETWORK_EVENTS;
    }

    static get DOM_EVENTS() {
        return DOM_EVENTS;
    }

    static get GROSS_EVENTS() {
        return GROSS_EVENTS;
    }

    get dns() {
        return this.timing.domainLookupEnd - this.timing.domainLookupStart;
    }

    get tcp() {
        return this.timing.connectEnd - this.timing.connectStart;
    }

    get request() {
        return this.timing.responseStart - this.timing.requestStart;
    }

    get response() {
        return this.timing.responseEnd - this.timing.responseStart;
    }

    get interactive() {
        return this.timing.domInteractive - this.timing.domLoading;
        // return this.timing.domInteractive - this.timing.navigationStart;
    }

    get content_loaded() {
        return this.timing.domContentLoadedEventEnd - this.timing.domLoading;
        // return this.timing.domContentLoadedEventEnd - this.timing.navigationStart;
    }

    get dom_complete() {
        return this.timing.domComplete - this.timing.domLoading;
        // return this.timing.domComplete - this.timing.navigationStart;
    }

    get load() {
        return this.timing.loadEventEnd - this.timing.domLoading;
    }

    get gross_network() {
        return this.timing.responseEnd - this.timing.navigationStart;
    }

    get gross_interactive() {
        return this.timing.domInteractive - this.timing.navigationStart;
    }

    get gross_load() {
        return this.timing.loadEventEnd - this.timing.navigationStart;
    }
};
