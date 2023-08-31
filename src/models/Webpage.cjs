const Model = require('objection').Model;
const knex = require('../../connection.cjs')

Model.knex(knex);

class Webpage extends Model {
    static get tableName() {
        return 'webpage';
    }

    static get relationMappings() {
        const WebpageFeedback = require('./WebpageFeedback.cjs');
        const WebpageFeedbackDetailed = require('./WebpageFeedbackDetailed.cjs');

        return {
            feedbacks: {
                relation: Model.HasManyRelation,
                modelClass: WebpageFeedback,
                join: {
                    from: 'webpage.id',
                    to: 'webpage_feedback.webpage_id'
                }
            },
            feedbackTags: {
                relation: Model.HasManyRelation,
                modelClass: WebpageFeedbackDetailed,
                join: {
                    from: 'webpage.id',
                    to: 'webpage_feedback_detailed.webpage_id',
                },
            }
        }
    }
}

module.exports = Webpage;