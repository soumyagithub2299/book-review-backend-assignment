const bookshelf = require('../db/knex');
const Review = bookshelf.model('Review', {
  tableName: 'reviews',
  user() {
    return this.belongsTo('User', 'user_id');
  },
  book() {
    return this.belongsTo('Book', 'book_id');
  },
});
module.exports = Review;
