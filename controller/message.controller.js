const events = require('events') 

const emitter = new events.EventEmitter();


class MessageController {
    async getMessage (req, res) {
        emitter.once('newMessage', (message) => {
            res.json(message)
           })
    }
    async postMessage (req, res) {
        const message = req.body;
        emitter.emit('newMessage', message)
        res.status(200)
    }
  
}

module.exports = new MessageController();