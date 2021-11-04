const cors = require('cors');

const corsMiddleware = cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
});

module.exports = corsMiddleware;