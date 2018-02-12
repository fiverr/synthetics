require('colors');
const { table, getBorderCharacters } = require('table');

/**
 * table configuration
 * @type {Object}
 */
const config = {
    columns: [
        { alignment: 'left', minWidth: 10},
        { alignment: 'center', minWidth: 10},
        { alignment: 'center', minWidth: 10},
    ],
    border: getBorderCharacters('norc')
};

/**
 * [description]
 * @param  {Object[]}                          results
 * @param  {Object[].String}                   name
 * @param  {Object[].String}                   url
 * @param  {Object[].Object[]}                 logs
 * @param  {Object[].Object[].Object[]}        log
 * @param  {Object[].Object[].Object[].String} key
 * @param  {Object[].Object[].Object[].Number} value
 * @return {[type]}          [description]
 */
module.exports = (results) => table(
    results.reduce((collector, { name, url, logs }) => [
        ...collector,
        [ name.bold , '', '' ],
        [ url.dim, 'First visit'.bold, 'Second visit'.bold ],
        ...Object.keys(logs[0]).map(key => [key.yellow, ...logs.map(i => i[key])]),
    ], []),
    config
);
