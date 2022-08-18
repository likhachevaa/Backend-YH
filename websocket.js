const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, console.log("Server started on 5000"))

wss.on('connection', function(ws) {
    ws.on('message', function(message){
        message = JSON.parse(message);
        switch(message.event) {
            case "message": 
            broadCastMessage(message)
            break;
            case "connection":
                broadCastMessage(message)
                break;
        }
    })
    // ws.send('пользователь подключился')
})
const message =  {
    event: 'message/connection',
    id:123,
    date: "18.08.2022",
    username: "test",
    message: 'test message'
}

// функция которая отправляет всем подключенным сообщение (широковешательная)

function broadCastMessage (message) {
wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
})
}