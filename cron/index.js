const cron = require('node-cron');

const removeOldTokens = require('./remove-old-token.job');

module.exports = () => {
    cron.schedule('0 0 * */1 *', async () => {
        await removeOldTokens();
    });
};
