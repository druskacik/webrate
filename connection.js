import config from './knexfile.js';
const environment = process.env.NODE_ENV || 'development';

import knex from 'knex';
const connection = knex(config[environment])

export default connection;