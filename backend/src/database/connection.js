const knex = require('knex');
const knexFile = require('../../knexfile') // pega as configuracoes do knex

const config = ( process.env.NODE_ENV === 'test' ? knexFile.test : knexFile.development);
// variavel de ambiente criada usando cross-env em package.js => script => test
/* Export */
const connection = knex(config); // escolhe por padrão a conexão em development
module.exports = connection;
