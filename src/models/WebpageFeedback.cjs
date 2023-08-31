const Model = require('objection').Model;
const knex = require('../../connection.cjs')

Model.knex(knex);

class WebpageFeedback extends Model {
    static get tableName() {
        return 'webpage_feedback';
    }

    static get relationMappings() {
        const Webpage = require('./Webpage.cjs');
        const WebpageFeedbackDetailed = require('./WebpageFeedbackDetailed.cjs');

        return {
            webpage: {
                relation: Model.BelongsToOneRelation,
                modelClass: Webpage,
                join: {
                    from: 'webpage_feedback.webpage_id',
                    to: 'webpage.id'
                }
            },
            detailedFeedbacks: {
                relation: Model.HasManyRelation,
                modelClass: WebpageFeedbackDetailed,
                join: {
                    from: 'webpage_feedback.id',
                    to: 'webpage_feedback_detailed.webpage_feedback_id'
                }
            },
        }
    }
}

module.exports = WebpageFeedback;