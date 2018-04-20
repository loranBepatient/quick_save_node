const EventEmitter = require('events');
const url = 'http//mylogger.io/log';

class Logger extends EventEmitter{
    log(message) {
        this.emit('message logged', {id: 1, res: 'message enregistré'})
    };
}

module.exports = Logger
