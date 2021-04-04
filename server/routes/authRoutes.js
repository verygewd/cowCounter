const express = require('express')
const authControl = require('../controllers/authController')

const router = express.Router()

router.route('/auth/signin')
    .post(authControl.signin)

router.route('/auth/signout')
    .get(authControl.signout)

module.exports=router