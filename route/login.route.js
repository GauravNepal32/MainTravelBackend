const { Router } = require('express')
const loginController = require('../controller/login.controller')
// const { loginValidation } = require('../module/validator')
const router = Router();


router.post('/api/login', loginController.login);


module.exports = router;