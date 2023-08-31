import express from 'express';

import {
    postFeedback,
    getFeedback,
} from './controller.js';
        
const router = express.Router();

router.route('/post')
    .post(postFeedback);

router.route('/get')
    .post(getFeedback);

export default router;
