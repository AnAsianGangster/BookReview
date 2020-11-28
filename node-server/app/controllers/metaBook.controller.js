const db = require('../models');
const MetaBook = db.metaBooks;

// Create and Save a new MetaBook
exports.create = (req, res) => {
    res.status(201).send({
        message: 'Create meta hit',
    });
};

// Retrieve all MetaBook from the database.
exports.findAll = (req, res) => {
    res.status(200).send({
        message: 'retrieve all meta hit',
    });
};

// Find a single MetaBooks with an id
exports.findMetaBookById = (req, res) => {
    res.status(200).send({
        message: 'find ono by id meta hit',
    });
};

// Update a MetaBook by the id in the request
exports.updateMetaBookById = (req, res) => {
    res.status(200).send({
        message: 'update one by id meta hit',
    });
};

// Delete a MetaBook with the specified id in the request
exports.delete = (req, res) => {
    res.status(200).send({
        message: 'delete one by id meta hit',
    });
};
