const express = require('express');
const userRouter = require('./routers/user.routers')
const authRouter = require('./routers/auth.routers')
const messRouter = require('./routers/message.routers')
const PORT = process.env.PORT || 8080
const cors = require('cors')
// const events = require('events') 

// const emitter = new events.EventEmitter();

const app = express();
app.use(cors())

app.use(express.json());
app.use('/api', userRouter)
app.use('/auth', authRouter)
app.use('/message', messRouter)

// app.get('/get-messages', (req, res) => {
//    emitter.once('newMessage', (message) => {
//     res.json(message)
//    })
// })

// app.post('/new-messages', (req, res) => {
//     const message = req.body;
//     emitter.emit('newMessage', message)
//     res.status(200)
// })


const start = () => {
    try{
        app.listen(PORT, () => console.log(`server start on port ${PORT}`)) 

    } catch(e) {
console.log(e)
    }
}

start();