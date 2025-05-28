const bookshelf = require('../db/knex');
const User = bookshelf.model('User', {
  tableName: 'users',
});
module.exports = User;
