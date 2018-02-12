const spinner = require('../spinner');
const measure = require('../measure');
const Calculator = require('../calculator');

/**
 * Perform measurements on a page
 * @param  {String} options.name
 * @param  {String} options.url
 * @return {PerformanceLog}
 */
module.exports = async function init({name, url}) {
    url = url.replace(/^\//, '');

    spinner.start();

    const results = await measure(url);

    spinner.text(`Calculating`);

    if (!Object.keys(results[0]).length) {
        return;
    }

    const logs = results.map((measurements, iteration) => {
        const {
            timing,
            metrics,
            entries,
        } = measurements;
        const calculator = new Calculator(timing);

        const getMetric = (name) => metrics.metrics.find(item => item.name === name).value * 1000; // convert to ms

        // require('./lib/raw')(timing, metrics, entries)

        const navigationStart = getMetric('NavigationStart');
        const record = (metric) => metric ? parseInt(metric - navigationStart) : 'N/A';

        return {
            'FirstMeaningfulPaint': record(getMetric('FirstMeaningfulPaint')),
            'DomContentLoaded': record(getMetric('DomContentLoaded')),
            'interactive': calculator.interactive,
            'content_loaded': calculator.content_loaded,
            'dom_complete': calculator.dom_complete,
        };
    });

    spinner.stop('\n');

    return { name, url, logs };
}
