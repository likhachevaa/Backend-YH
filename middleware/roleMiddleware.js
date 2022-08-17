const { secret } = require("../config")
const jwt = require('jsonwebtoken')


module.exports = function (roles) { // передаем массив ролей
    // используем замыкание из функции возращем функцию

    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try{
    const token = req.headers.authorization.split(" ")[1] 
    if(!token) {
        return res.status(403).json({message: "Пользователь не авторизован"})
      
    } 
    const {roles: userRoles}  = jwt.verify(token, secret) //из токена получаем массив ролей 

    // проверяем если в списки ролей те роли которые разрешены для функции

    let hashRole = false
    userRoles.forEach (role => {
    // проверяем если массив roles содержит в себе роль которая есть у пользователя, то тогда эта функция будет разрешена
    if(roles.includes(role)){
        hashRole = true
        }  
    })
    if (!hashRole) {
        return res.status(403).json({message: "У вас нет доступа"})
    }
    next() 
    }catch(e){
    console.log(e)
    return res.status(403).json({message: "Пользователь не авторизован"})
        }
    } 
}