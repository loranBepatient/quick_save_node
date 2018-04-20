const Logger = require('./logger');
const logger = new Logger()

logger.on('message logged', (arg) => console.log('listener called', arg.id, arg.res))
logger.log('message')
