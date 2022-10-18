const { Router } = require('express')
const router = Router();
const commentController = require('../controller/comment.controller')

router.post('/api/add-comment', commentController.add_comment);
router.get('/api/get-comments/:id', commentController.get_comment);
router.get('/api/get-review/:id', commentController.get_review);

module.exports = router