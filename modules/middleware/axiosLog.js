const logger = require('../../utilities/log4js').getLogger('apiLogs');
require('axios-debug-log')({
    request: function (debug, config) {
        let headers = JSON.stringify(config.headers);
        logger.debug(`Request URL : ${config.url} \n Method : ${config.method} \n Params : ${JSON.stringify(config.params)} \n headers : ${headers}`);
        logger.debug(`Request with headers => `, config.headers['content-type']);
        debug('Request with headers => ' + config.headers['content-type']);
    },
    response: function (debug, response) {
        logger.debug(`Response content-type `, response.headers['content-type']);
        logger.debug(`Response from `, response.headers['content-type']);
        logger.debug(`Response data `, response.data);

        debug(
            'Response with ' + response.headers['content-type'],
            'from ' + response.config.url,
            'data ' + JSON.stringify(response.data)
        )
    },
    error: function (debug, error) {
        logger.error(`error `, error);
        debug('error ', error)
    }
})
