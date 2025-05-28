const knex = require('knex');
const config = require('../knexfile');
const bookshelf = require('bookshelf');

const knexInstance = knex(config.development);
const bookshelfInstance = bookshelf(knexInstance);
bookshelfInstance.plugin('registry');

module.exports = bookshelfInstance;
