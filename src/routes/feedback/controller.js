import Webpage from '../../models/Webpage.cjs';
import WebpageFeedback from '../../models/WebpageFeedback.cjs';
import WebpageFeedbackDetailed from '../../models/WebpageFeedbackDetailed.cjs';

const getOrInsertWebpage = async (fullUrl) => {

    const url = new URL(fullUrl);
    let host = url.host;

    // remove www. from host
    if (host.startsWith('www.')) {
        host = host.slice(4);
    }

    let urlDB = await Webpage.query().findOne({ url: host });

    if (urlDB) {
        return urlDB.id;
    } else {
        urlDB = await Webpage.query().insertAndFetch({ url: host });
        return urlDB.id;
    }
}

export const postFeedback = async (req, res) => {

    const url = req.body.url;
    const positive = req.body.positive;
    const feedbackTags = req.body.feedbackTags;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {

        const webpageID = await getOrInsertWebpage(url);

        let feedbackDB = await WebpageFeedback.query().findOne({
            webpage_id: webpageID,
            user_id: ip,
        });

        if (!feedbackDB) {
            feedbackDB = await WebpageFeedback.query().insertAndFetch({
                webpage_id: webpageID,
                user_id: ip,
                is_positive: positive,
            });
        }

        const feedbackID = feedbackDB.id;

        if (feedbackTags) {
            // this means the user clicked on a negative feedback tag
            await Promise.all(feedbackTags.map(async (feedbackTag) => {
                const feedbackDetailedDB = await WebpageFeedbackDetailed.query().findOne({
                    webpage_id: webpageID,
                    webpage_feedback_id: feedbackID,
                    tag: feedbackTag,
                });

                if (!feedbackDetailedDB) {
                    await WebpageFeedbackDetailed.query().insert({
                        webpage_id: webpageID,
                        webpage_feedback_id: feedbackID,
                        is_positive: positive,
                        tag: feedbackTag,
                    })
                }
            }));
        }

        res.status(200)
            .json({
                message: 'Feedback received',
            })
        return;

    } catch (err) {
        console.log(err);
        res.status(500)
            .json({
                message: 'Internal server error',
            });
    }
}

const getWebpageRating = async (webpageUrl) => {
    try {
        const url = new URL(webpageUrl);
        let host = url.host;
    
        // remove www. from host
        if (host.startsWith('www.')) {
            host = host.slice(4);
        }
    
        let urlDB = await Webpage.query()
            .findOne({ url: host })
            .withGraphFetched('[feedbacks, feedbackTags]')
            .modifyGraph('feedbackTags', builder => {
                builder.select('tag').count('tag as count').groupBy('tag').orderBy('count', 'desc');
            });

        if (!urlDB) {
            return null;
        } else {

            const positiveFeedback = urlDB.feedbacks.filter(feedback => feedback.is_positive);
            const negativeFeedback = urlDB.feedbacks.filter(feedback => !feedback.is_positive);

            const score = positiveFeedback.length - negativeFeedback.length;
            return {
                tags: urlDB.feedbackTags,
                score,
            };
        }
    } catch (err) {
        return null;
    }
}


export const getFeedback = async (req, res) => {

    try {

        const urls = req.body.urls;
        const ratings = await Promise.all(urls.map(url => getWebpageRating(url)));

        const result = urls.reduce((obj, key, index) => {
            obj[key] = ratings[index];
            return obj;
        }, {});

        res.status(200)
            .json(result);
        return;

    } catch (err) {
        console.log(err);
        res.status(500)
            .end({
                message: 'Internal server error',
            });
    }
}
