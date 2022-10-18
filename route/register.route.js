const { Router } = require('express')
const registerController = require('../controller/register.controller')
const router = Router();


router.post('/api/register', registerController.register);


module.exports = router;
