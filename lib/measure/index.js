require('colors');
const puppeteer = require('puppeteer');
const spinner = require('../spinner');

module.exports = async (route, visits = 1) => {
    try {
        spinner.text(`visiting pages`);
        const browser = await puppeteer.launch({headless: false});

        const metrics = [];

        metrics.push(await getMetrics(
            browser,
            route
        ));

        metrics.push(await getMetrics(
            browser,
            route
        ));

        await browser.close();

        return metrics;
    } catch (error) {
        console.error(error);
        return {};
    }
};

const SLEEP = 3;
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

async function getMetrics(browser, route) {
    try {
        spinner.text(`Opening page ${route}`);

        const page = await browser.newPage();
        await page.goto(route);

        spinner.text(`Hanging around the pages (3 seconds)`);

        await sleep(SLEEP * 1000);

        spinner.text(`Collecting performance info`);

        const performance = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance))
        );
        const metrics = await page._client.send('Performance.getMetrics');
        const entries = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance.getEntries()))
        );

        return Object.assign(
            {},
            performance,
            { metrics, entries }
        );
    } catch (error) {
        console.log(error.toString().red);
        return {};
    }
}
