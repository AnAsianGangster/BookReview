const db = require('../models');
const MetaBook = db.metaBooks;

// regular expression
const regexUtil = require('./util/regex');

// Create and Save a new MetaBook
exports.create = (req, res) => {
    // valid request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content cannot be empty',
        });
        return;
    }

    // FIXME doesn't handle duplicate
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

// Retrieve ten random MetaBooks from the database
exports.findTenRandomMetaBooks = (req, res) => {
    const numberOfBooks = parseInt(req.params.numberOfBooks) || 10;

    MetaBook.find()
        .limit(numberOfBooks)
        .exec((err, data) => {
            if (err) {
                res.status(500).send({ message: 'error occurred when give 10 random books' });
            } else {
                res.status(200).send(data);
            }
        });
};

// Retrieve all MetaBook from the database by title.
exports.findMetaBookByTitle = (req, res) => {
    const title = req.query.title;
    const regex = new RegExp(regexUtil.escapeRegex(title), 'gi');
    let condition = { title: regex };

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

    if (!req.query.categories) {
        res.status(400).send({
            message: 'categories cannot be empty.',
        });
    }

    let condition = { categories: [categories] };

    MetaBook.find(condition)
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving metaBooks.',
            });
        });

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
