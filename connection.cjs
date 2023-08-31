const config = require('./knexfile.cjs');
const environment = process.env.NODE_ENV || 'development';

const connection = require('knex')(config[environment])

module.exports = connection;