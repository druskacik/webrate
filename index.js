import app from './src/server.js';

const port = process.env.PORT || 3000;

const listen = (port) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
};

listen(port);