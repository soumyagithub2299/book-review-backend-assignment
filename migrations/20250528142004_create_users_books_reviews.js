exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.string('genre').notNullable();
      table.text('description').notNullable();
      table.timestamps(true, true);
    })
    .createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('book_id').references('id').inTable('books').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('rating').notNullable();
      table.text('review').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('books')
    .dropTableIfExists('users');
};
