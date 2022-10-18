const Router = require('express')
const packageController = require('../controller/package.controller')
const dayBreakController = require('../controller/dayBreak.controller')
const router = Router();
const { requireAuth } = require('../middleWare/authMiddleWare');
const { upload } = require('../middleWare/fileUploadMiddleWare');

router.get('/api/get-package', packageController.get_packages);
router.post('/api/add-package', requireAuth, upload.single('image'), packageController.add_package);
router.get('/api/get-package/:id', packageController.get_package_by_id);
router.post('/api/update-package/:id', requireAuth, upload.single('image'), packageController.update_package)
router.delete('/api/delete-package/:id', requireAuth, packageController.delete_package)

router.post('/api/update-day/:id', requireAuth, dayBreakController.edit_day);
router.delete('/api/delete-day/:id', requireAuth, dayBreakController.delete_day)
module.exports = router;


