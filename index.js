const express = require('express');
const userRouter = require('./routers/user.routers')
const authRouter = require('./routers/auth.routers')
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use('/api', userRouter)
app.use('/auth', authRouter)


const start = () => {
    try{
        app.listen(PORT, () => console.log(`server start on port ${PORT}`)) 

    } catch(e) {
console.log(e)
    }
}

start();