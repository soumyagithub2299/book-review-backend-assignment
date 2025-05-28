const Review = require('../models/Review');

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id; // from auth middleware
    const { rating, review } = req.body;

    // Find the review
    const reviewFinal = await Review.where({ id: reviewId }).fetch({ require: false });
    if (!reviewFinal) return res.status(404).json({ message: 'Review not found' });

    // Check ownership
    if (reviewFinal.get('user_id') !== userId)
      return res.status(403).json({ message: 'Not authorized to update this review' });

    // Validate input (simple example)
    if (rating && (rating < 1 || rating > 5))
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });

    // Update review
    await reviewFinal.save({ rating, review }, { patch: true });
    res.json({ message: 'Review updated', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    // Find the review
    const reviewFinal = await Review.where({ id: reviewId }).fetch({ require: false });
    if (!reviewFinal) return res.status(404).json({ message: 'Review not found' });

    // Check ownership
    if (reviewFinal.get('user_id') !== userId)
      return res.status(403).json({ message: 'Not authorized to delete this review' });

    // Delete
    await reviewFinal.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
