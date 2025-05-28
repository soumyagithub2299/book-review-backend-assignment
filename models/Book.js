const bookshelf = require('../db/knex');
const Book = bookshelf.model('Book', {
  tableName: 'books',
  reviews() {
    return this.hasMany('Review', 'book_id');
  },
});
module.exports = Book;
