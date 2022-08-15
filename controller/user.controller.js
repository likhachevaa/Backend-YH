const db = require('../db')

class UserController {
    async createUser (req, res) {
    const {name} = req.body
    const newPerson = await db.query('INSERT INTO person (name) values ($1) RETURNING *', [name]) // это sql запрос на создание пользователя в базу данных 
    res.json(newPerson.rows[0]) // это чтобы вернулось только поле rows
    }
    async getUser (req, res) {
        const users = await db.query('SELECT * FROM person') // это sql запрос для получения все пользователей сущности Person
        res.json(users.rows)
    }
    async getOneUser (req, res) {
        const id = req.params.id // из параметра запроса получаем ID 
        const user = await db.query('SELECT * FROM person where id = $1', [id]) // это sql запрос для получения все пользователей сущности Person
        res.json(user.rows) // возвращаем обратно на клиент
    }
    async updateUser (req, res) {

        const {id, name} = req.body
        const user = await db.query('UPDATE person set name = $1, id = $2 RETURNING *', [name, id])
        res.json(user.rows[0])
        
    }
    async deleteUser (req, res) {
        const id = req.params.id 
        const user = await db.query('DELETE FROM person where id = $1', [id]) 
        res.json(user.rows) 
    }
}

module.exports = new UserController();