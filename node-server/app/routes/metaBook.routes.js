module.exports = (router) => {
    const metaBooks = require('../controllers/metaBook.controller.js');

    // Create a new metaBook
    router.post('/metaBooks', metaBooks.create);

    // Retrieve all metaBooks with reviews
    router.get('/metaBooks', metaBooks.findAll);

    // Retrieve a single metaBook with id
    router.get('/metaBooks/:id', metaBooks.findMetaBookById);

    // update a single metaBook with id
    router.put('/metaBooks/:id', metaBooks.updateMetaBookById);

    // Delete a metaBook with id
    router.delete('/metaBooks/:id', metaBooks.delete);
};
