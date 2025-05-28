const Book = require('../models/Book');
const Review = require('../models/Review');
const User = require('../models/User');
const Joi = require('joi');

// Validation schema for adding a book
const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().optional(),
  description: Joi.string().optional()
});

exports.addBook = async (req, res) => {
  try {
    const { error, value } = addBookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = await new Book(value).save();
    res.status(201).json({ message: 'Book added', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, genre } = req.query;

    const books = await Book.query((qb) => {
      if (author) qb.where('author', 'ilike', `%${author}%`);
      if (genre) qb.where('genre', 'ilike', `%${genre}%`);
      qb.orderBy('id', 'desc');
    }).fetchAll();

    res.json(books.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    // 👉 1) tell Bookshelf *not* to throw on empty
    const book = await Book.where({ id: bookId }).fetch({
      require    : false,                         // <─ added
      withRelated: [{
        reviews: qb => qb.orderBy('created_at', 'desc')
      }]
    });

    // 👉 2) handle “not found” yourself
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // 👉 3) average rating (guard against null)
    const { avg_rating } = await Review
      .where('book_id', bookId)
      .query()
      .avg('rating as avg_rating')
      .first() || { avg_rating: null };

    const avgRating = avg_rating ? Number(avg_rating).toFixed(2) : null;

    res.json({
      book          : book.toJSON(),
      averageRating : avgRating,
      reviews       : book.related('reviews').toJSON()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });

    // Check if book exists
    const book = await Book.where({ id: bookId }).fetch({ require: false });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if user already reviewed this book
    const existingReview = await Review.where({ book_id: bookId, user_id: userId }).fetch({ require: false });
    if (existingReview)
      return res.status(400).json({ message: 'You have already reviewed this book' });

    // Create review
    const reviewFinal = await new Review({ book_id: bookId, user_id: userId, rating, review }).save();
    res.status(201).json({ message: 'Review added', reviewFinal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query is required' });

    const books = await Book.query(qb => {
      qb.where('title', 'ilike', `%${q}%`)
        .orWhere('author', 'ilike', `%${q}%`);
    })
    .orderBy('id', 'desc')
    .fetchAll();

    res.json(books.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};