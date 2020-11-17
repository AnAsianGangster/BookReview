const db = require('../models/index');
const Book = db.books;

// create a new book
exports.createBook = (req, res) => {
    // Validate request
    if (!req.body.asin) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a book
    const book = {
        asin: req.body.asin,
        title: req.body.title,
        price: req.body.price,
        brand: req.body.brand,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
    };

    // Save book in the database
    Book.create(book)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the book.',
            });
        });
};

// all books with reviews
exports.findAllBooks = (req, res) => {
    Book.findAll({ include: ['reviews'] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while finding all books with reviews',
            });
        });
};

// get reviews for a given book
exports.findBookById = (req, res) => {
    const asin = req.params.asin;

    Book.findByPk(asin, { include: ['reviews'] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while finding reviews the book.',
            });
        });
};

// update book by id
exports.updateBookById = (req, res) => {
    const asin = String(req.params.asin);

    const newBook = {
        title: req.body.title,
        price: req.body.price,
        brand: req.body.brand,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
    };

    Book.update(newBook, { where: { asin: asin } })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while updating the book.',
            });
        });
};
