import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')




    useEffect(() => {
        subscribe()
    }, [])

    const connect = async () => {
        try{
            await axios.post('http://localhost:8080/auth/userLogin', {
                username: username,
                password: password
            })
            setConnected(true)
        } catch(e){
            console.log(e)
        }
    
    }

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:8080/message/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:8080/message/new-messages', {
            message: value,
            id: Date.now()
        })
    }


    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                         <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="text"
                        placeholder="Введите пароль"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }




    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                //      {connected
                //      ? <div className="connection_message">
                //          Пользователь {username} подключился
                //      </div>
                //      : <div className="message">
                //          {username}. {mess.message}
                //      </div>
                //  }
                        <div className="message" key={mess.id}>
                             {username}: {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongPulling;
