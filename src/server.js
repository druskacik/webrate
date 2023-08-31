import express from 'express';
import cors from 'cors';

import feedback from './routes/feedback/index.js';

const environment = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());

app.use(cors({
    origin: environment === 'development' ? '*' : `moz-extension://${process.env.EXTENSION_ID}`,
}))

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.use(`/api/feedback`, feedback);

export default app;
