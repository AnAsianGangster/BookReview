module.exports = (app) => {
    const router = require('express').Router();

    // auth routes
    require('./auth.routes')(router);

    // book routes
    require('./book.routes')(router);

    // metaBook routes
    require('./metaBook.routes')(router);

    // review routes
    require('./review.routes')(router);

    // user routes
    require('./user.routes')(router);

    // root routes
    app.use('/api', router);
};
