const Model = require('objection').Model;
const knex = require('../../connection.cjs')

Model.knex(knex);

class WebpageFeedbackDetailed extends Model {
    static get tableName() {
        return 'webpage_feedback_detailed';
    }

    static get relationMappings() {
        const Webpage = require('./Webpage.cjs');
        const WebpageFeedback = require('./WebpageFeedback.cjs');

        return {
            webpage: {
                relation: Model.BelongsToOneRelation,
                modelClass: Webpage,
                join: {
                    from: 'webpage_feedback_detailed.webpage_id',
                    to: 'webpage.id'
                }
            },
            feedback: {
                relation: Model.BelongsToOneRelation,
                modelClass: WebpageFeedback,
                join: {
                    from: 'webpage_feedback_detailed.webpage_feedback_id',
                    to: 'webpage_feedback.id'
                }
            },
        }
    }
}

module.exports = WebpageFeedbackDetailed;