const Router = require('express')
const listController = require('../controller/list.controller')
const router = Router();

router.get('/api/get-location-list', listController.get_location_list)
router.get('/api/get-category-list', listController.get_category_list)

module.exports = router;
