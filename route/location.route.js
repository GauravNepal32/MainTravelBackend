const Router = require('express')
const locationController = require('../controller/location.controller')
const router = Router();
const { requireAuth } = require('../middleWare/authMiddleWare');
const { upload } = require('../middleWare/fileUploadMiddleWare');

router.get('/api/get-location', locationController.get_locations);
router.post('/api/add-location', requireAuth, upload.single('image'), locationController.add_location);
router.get('/api/get-location/:id', locationController.get_location_by_id);
router.post('/api/update-location/:id', requireAuth, upload.single('image'), locationController.update_location)
router.delete('/api/delete-location/:id', requireAuth, locationController.delete_location)
module.exports = router;