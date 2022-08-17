const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try{
const token = req.headers.authorization.split(" ")[1] // поскольку нас интерисует только сам токен и не интерисует его тип, делим две части по пробелу и берем вторую часть в массиве это будет по индексу один
if(!token) {
    return res.status(403).json({message: "Пользователь не авторизован"})
  
} 
const decodedData = jwt.verify(token,  secret )
req.user = decodedData // чтобы эти данные могли использовать внутри других функций, в запрос создаем новое поле юзер и туда добавляем эти данные
next() // вызываем функцию чтобы запустить по цепочки следующий мидлвере если он есть
}catch(e){
console.log(e)
return res.status(403).json({message: "Пользователь не авторизован"})
    }
}