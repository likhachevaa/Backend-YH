const express = require('express');
const userRouter = require('./routers/user.routers')
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`test`)) 