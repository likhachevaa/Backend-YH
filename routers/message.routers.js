const Router = require('express')
const router = new Router()
const MessageController = require('../controller/message.controller')



router.get('/get-messages', MessageController.getMessage)
router.post('/new-messages', MessageController.postMessage)

module.exports = router