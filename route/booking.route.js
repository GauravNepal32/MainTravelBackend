const Router = require('express')
const bookingController = require('../controller/booking.conttoller')
const router = Router();
const { requireToken } = require('../middleWare/authMiddleWare');

router.post('/api/book-package', requireToken, bookingController.book_package)
router.get('/api/get-booking-info', requireToken, bookingController.get_bookin_user)

module.exports = router