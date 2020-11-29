const db = require('../models');
const MetaBook = db.metaBooks;

// Create and Save a new MetaBook
exports.create = (req, res) => {
    // valid request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content cannot be empty',
        });
        return;
    }

    // create the metaBook
    const metaBook = new MetaBook({
        asin: req.body.asin,
        title: req.body.title,
        price: req.body.price,
        imUrl: req.body.imUrl,
        brand: req.body.brand,
        categories: req.body.categories,
    });

    // save the metaBook in mongodb
    metaBook
        .save(metaBook)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the metaBook.',
            });
        });
};

// Retrieve all MetaBook from the database by title.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

    MetaBook.find(condition)
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving metaBooks.',
            });
        });
};

// Find MetaBooks by categories
exports.findMetaBookByCategories = (req, res) => {
    const categories = req.query.categories;
    res.status(200).send({
        message: 'find by categories endpoint hit',
    });
};

// Find a single MetaBooks with an id.
// NOTE not important
exports.findMetaBookById = (req, res) => {
    res.status(200).send({
        message: 'find one by id meta hit',
    });
};

// Update a MetaBook by the id in the request
// NOTE not important
exports.updateMetaBookById = (req, res) => {
    res.status(200).send({
        message: 'update one by id meta hit',
    });
};

// Delete a MetaBook with the specified id in the request
// NOTE not important
exports.delete = (req, res) => {
    res.status(200).send({
        message: 'delete one by id meta hit',
    });
};
