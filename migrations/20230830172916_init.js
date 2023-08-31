
export function up(knex) {
    return Promise.all([
        knex.schema.createTable('webpage', (table) => {
            table.increments('id').primary();
            table.string('url');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table webpage was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('webpage_feedback', (table) => {
            table.increments('id').primary();
            table.integer('webpage_id').unsigned();
            table.foreign('webpage_id').references('webpage.id');
            table.string('user_id');
            table.boolean('is_positive').defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table webpage_feedback was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('webpage_feedback_detailed', (table) => {
            table.increments('id').primary();
            table.integer('webpage_id').unsigned();
            table.foreign('webpage_id').references('webpage.id');
            table.integer('webpage_feedback_id').unsigned();
            table.foreign('webpage_feedback_id').references('webpage_feedback.id');
            table.boolean('is_positive').defaultTo(true);
            table.string('tag').collate('utf8mb4_unicode_ci');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table webpage_feedback_detailed was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

export function down(knex) {
    return Promise.all([
        knex.schema.dropTable('webpage_feedback_detailed')
            .then(() => {
                console.log('Table webpage_feedback_detailed was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('webpage_feedback')
            .then(() => {
                console.log('Table webpage_feedback was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('webpage')
            .then(() => {
                console.log('Table webpage was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
