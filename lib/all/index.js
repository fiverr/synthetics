const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const page = require('../page');
const {ROOT} = require('../constants');
const pages = require('../../pages.json').map(page => Object.assign(page, { url: ROOT + page.url}));

(async() => {
    try {
        const results = await Promise.all(pages.map(async test => await page(test)));

        try {
            await mkdir('results');
        } catch (error) {
            if (!error.code === 'EEXIST') {
                throw error;
            }
        }

        const filename = `results/${new Date().toISOString().replace(/[T:\.]/g, '-').replace('Z', '')}.json`;
        await writeFile(filename, JSON.stringify(results, null, 2));

        console.log(`written result at ${filename}`);
    } catch (error) {
        throw error;
    }
})();
