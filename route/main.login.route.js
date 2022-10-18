const { Router } = require('express')
const router = Router();
const loginController = require('../controller/main.login.controller')
const { requireToken } = require('../middleware/authMiddleWare')

router.post('/api/user-register', loginController.register);
router.post('/api/user-login', loginController.login);
router.post('/api/change-password', requireToken, loginController.change_password);
router.get('/api/get-info', requireToken, loginController.get_info)
module.exports = router;