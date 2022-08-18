const Router = require('express')
const authController = require('../controller/auth.controller')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")



router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть не меньше 4 и не больше 10 символов").isLength({min: 4, max: 10})
], authController.registration)
router.post('/login', authController.login)
// router.get('/users', authMiddleware, authController.getUsers)
// router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
router.get('/users', authController.getUsers)
router.post('/userLogin', authController.getUser)


module.exports = router