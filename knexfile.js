import dotenv from 'dotenv';

dotenv.config();

export default {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        pool: {
            min: 0,
            max: 10,
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        pool: {
            min: 0,
            max: 7,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

};
