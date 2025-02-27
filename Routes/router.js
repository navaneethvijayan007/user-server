const express = require('express');
const userController = require('../controllers/userController')

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login - post
router.post('/login',userController.loginController)

//all-users - post
router.get('/all-users',userController.getUsersController)

//one-users - post
router.post('/one-user',userController.getOneUserController)


module.exports = router