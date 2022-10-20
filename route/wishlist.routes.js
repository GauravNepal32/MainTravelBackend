const { Router } = require('express')
const router = Router();
const wishlistController = require('../controller/wishlist.controller')
const { requireToken } = require('../middleware/authMiddleWare')

router.post('/api/add-wishlist', requireToken, wishlistController.add_wishlist);
router.delete('/api/remove-wishlist/:id', requireToken, wishlistController.delete_wishlist);
router.get('/api/get-wishlist', requireToken, wishlistController.get_wishlist);
router.get('/api/get-wishlist_data', requireToken, wishlistController.get_wishlist_data);

module.exports = router