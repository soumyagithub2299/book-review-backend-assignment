const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController');

router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
