const db = require('../db')
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const {secret} = require('../config')

const generateAccessToken = (id) => {
const payload = {
    id
}
return jwt.sign(payload, secret, {expiresIn: "24h"} )
}


class authController {
    async registration(req, res) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Ошибка при регистрации",  errors})
        }
        const {username, password} = req.body

        // dont work

    //     const candidate = await db.query('SELECT FROM usersMain where username = $1', [username]) // проверяем зареган ли уже такой пользователь
    //     // const candidate = await db.query('SELECT * FROM usersMain WHERE username = $1', [username]) // проверяем зареган ли уже такой пользователь
    //     console.log(res.json(candidate.rows[0]), 'tyt candidate')
    // if (candidate) {
    //     return res.status(400).json({message: "Пользователь с таким именем уже существует!"})
    // }
    // const hashPassword = bcrypt.hashSync(password, 7); // хешируем пароль
    //  //toDO
    // const userRole = await db.query('SELECT * FROM role where value = $1', ["user"])
    // const test = res.json(userRole.rows[0])

    // console.log(userRole, "tyt userrole")

    const hashPassword = bcrypt.hashSync(password, 7); // хешируем пароль

    const user = await db.query('INSERT INTO usersMain (username, password) values ($1, $2) RETURNING *', [username, hashPassword,]) // это sql запрос на создание пользователя в базу данных 
    return res.status(200).json({message: "Пользователь успешно зарегистрирован"})




    }catch (e) {
            console.log(e.message)
            res.status(400).json({message: 'Registration error'})
    }   
        } 
    async login(req, res) {
        try{
            const {username, password} = req.body
            // const username = req.params.username // из параметра запроса получаем username
            // const p = req.params.password 
            const userdb = await db.query('SELECT * FROM usersMain where username = $1', [username])
            const user = userdb.rows[0]
            console.log(user, "userTyt")

            if (!user) {
                return res.status(400).json({message: `пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: `Введен не верный пароль`})
            }

            const token = generateAccessToken(user.id)
            return res.json({token})



        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    } 
    async getUsers(req, res) {
        try{
            const users = await db.query('SELECT * FROM usersMain') // это sql запрос для получения все пользователей сущности Person
            res.json(users.rows)
           
        }catch (e) {

        }
    } 
    async getUser(req, res) {
        try{
            const {username, password} = req.body
            // const username = req.params.username // из параметра запроса получаем username
            // const p = req.params.password 
            const userdb = await db.query('SELECT * FROM usersMain where username = $1', [username])
            const user = userdb.rows[0]
            console.log(user, "userTyt")

            if (!user) {
                return res.status(400).json({message: `пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: `Введен не верный пароль`})
            }

            return res.json({username})
           
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()