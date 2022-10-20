const Router = require('express')
const bookingController = require('../controller/booking.conttoller')
const router = Router();
const { requireToken, requireAuth } = require('../middleWare/authMiddleWare');

router.post('/api/book-package', requireToken, bookingController.book_package)
router.get('/api/get-booking-info', requireToken, bookingController.get_bookin_user)
router.get('/api/get-all-booking', requireAuth, bookingController.get_all_booking)
router.post('/api/update-status', requireAuth, bookingController.edit_status)

module.exports = router