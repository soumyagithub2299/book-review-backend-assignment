const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bookController = require('../controllers/bookController');

// Authenticated routes
router.post('/', auth, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/:id/reviews', auth, bookController.addReview);

// Additional feature
router.get('/search/title', bookController.searchBooks);

module.exports = router;
