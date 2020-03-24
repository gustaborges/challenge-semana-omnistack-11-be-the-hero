const knex = require('knex');
const configuration = require('../../knexfile') // pega as configuracoes do knex

/* Export */
const connection = knex(configuration.development); // escolhe por padrão a conexão em development
module.exports = connection;
