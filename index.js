#!/usr/bin/env node

require('colors');
const inquirer = require('inquirer');
const table = require('./lib/table');
const page = require('./lib/page');

const {ROOT} = require('./lib/constants');

const pages = require('./pages.json').map(page => Object.assign(page, { url: ROOT + page.url}));

try {
    (async () => {
        const { tests } = await inquirer
            .prompt([
                {
                    name: 'tests',
                    message: 'Measure Pages',
                    type: 'checkbox',
                    choices: pages.map(page => ({
                        name: page.name,
                        value: page,
                    })),
                },
            ]);

        const results = table(
            await Promise.all(
                tests.map(
                    async test => await page(test)
                )
            )
        );

        console.log(`\n${results}`);
    })();
} catch (error) {
    console.error(error);
    return;
}
