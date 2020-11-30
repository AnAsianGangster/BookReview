module.exports = (router) => {
    const metaBooks = require('../controllers/metaBook.controller.js');

    // Create a new metaBook
    router.post('/metaBooks', metaBooks.create);

    // Retrieve ten random metaBooks, default 10
    router.get('/metaBooks/:numberOfBooks', metaBooks.findTenRandomMetaBooks);

    // Retrieve all metaBooks by title
    router.get('/metaBooks/title', metaBooks.findMetaBookByTitle);

    // Retrieve all metaBooks by categories
    router.get('/metaBooks/categories', metaBooks.findMetaBookByCategories);

    // Retrieve a single metaBook with id
    router.get('/metaBooks/:id', metaBooks.findMetaBookById);

    // update a single metaBook with id
    router.put('/metaBooks/:id', metaBooks.updateMetaBookById);

    // Delete a metaBook with id
    router.delete('/metaBooks/:id', metaBooks.delete);
};
