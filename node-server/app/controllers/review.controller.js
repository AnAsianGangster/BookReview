const db = require('../models/index');
const Review = db.reviews;

// create a new review
exports.createReview = (req, res) => {
    // Validate request
    if (!req.body.asin) {
        res.status(400).send({
            message: 'asin can not be empty!',
        });
        return;
    }

    // Create a review
    const review = {
        asin: req.body.asin,
        helpful: req.body.helpful,
        overall: req.body.overall,
        reviewText: req.body.reviewText,
        reviewerID: req.body.reviewerID,
        reviewerName: req.body.reviewerName,
        summary: req.body.summary,
    };

    // Save book in the database
    Review.create(review)
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

// all reviews
exports.findAllReviews = (req, res) => {
    Review.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while finding all reviews',
            });
        });
};

// get review for review id
exports.findReviewById = (req, res) => {
    const id = req.params.id;

    Review.findByPk(id, { include: ['book', 'reviewer'] })
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

// update review for review id
exports.updateReviewById = (req, res) => {
    const id = req.params.id;

    const newReview = {
        helpful: req.body.helpful,
        overall: req.body.overall,
        reviewIext: req.body.reviewText,
        summary: req.body.summary,
    };

    Review.update(newReview, { where: { id: id } })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500),
                send({
                    message:
                        err.message ||
                        'Some error occurred while updating review',
                });
        });
};
