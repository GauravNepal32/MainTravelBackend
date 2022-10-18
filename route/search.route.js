const { Router } = require('express');
const searchQuery = require('../controller/search.controller')
const router = Router();

router.post('/api/searchpackage', searchQuery.searchQuery);
router.get('/api/get-location', searchQuery.getLocation)
router.get('/api/get-activity', searchQuery.getActivity)

module.exports = router;