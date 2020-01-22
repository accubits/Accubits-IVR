const log4js = require('log4js');

log4js.configure({
    appenders: {
        apiLogs: {
            type: 'dateFile',
            filename: 'logs/apiLogs.log',
            maxLogSize: 10485760
        },
    },
    categories: {
        default: {
            appenders: ['apiLogs'],
            level: 'debug'
        }
    },
    pm2: true
});

module.exports = log4js