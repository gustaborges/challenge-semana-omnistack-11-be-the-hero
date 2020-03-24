
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(t) {
        t.string('id').primary(); // id do tipo texto gerado por mim
        t.string('name').notNullable();
        t.string('email').notNullable();
        t.string('whatsapp').notNullable();
        t.string('city').notNullable();
        t.string('uf', 2).notNullable();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

// knex migrate:latest