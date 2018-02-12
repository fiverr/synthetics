const { Spinner } = require('cli-spinner');

/**
 * Singleton for a Spinner
 * @type {Object}
 */
module.exports = {
    start: () => {
        if (!global.spinner) {
            global.spinner = new Spinner(`Collecting data`);
            global.spinner.setSpinnerString('⠁⠁⠁⠂⠂⠄⡀⠄⠂⠂');
            global.spinner.start();
        }
    },
    stop: () => {
        global.spinner.stop()
    },
    text: (string) => {
        global.spinner.text = string;
    }
};
