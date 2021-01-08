const express = require('express')

const authen_router = express.Router();
const authen_controller = require('../controllers/authen.controller')

authen_router.route('/login/doctor')
.post(authen_controller.login_doctor)

authen_router.route('/login/patient')
.post(authen_controller.login_patient)

authen_router.route('/signup/doctor')
.post(authen_controller.signup_doctor)

authen_router.route('/signup/patient')
.post(authen_controller.signup_patient)


module.exports = authen_router;