const db = require('../models/index');
const Review = db.reviews;

const logger = require('../config/logger.config');

// create a new review
exports.createReview = (req, res) => {
    // Validate request
    if (!req.body.asin) {
        res.status(400).send({
            message: 'asin can not be empty!',
        });
        logger.error('Error empty asin when create review');
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
            // TODO log review id
            logger.info(
                `Successfully created review: asin:${review.asin} reviewerID: ${review.reviewerID}`
            );
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the book.',
            });
            logger.error(`Error when creating review: ${err.message}`);
        });
};

// all reviews
exports.findAllReviews = (req, res) => {
    Review.findAll()
        .then((data) => {
            res.send(data);
            logger.info('Successfully find all reviews');
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while finding all reviews',
            });
            logger.error(`Error when find al reviews: ${err.message}`);
        });
};

// get review for review id
exports.findReviewById = (req, res) => {
    const id = req.params.id;

    Review.findByPk(id, { include: ['book', 'reviewer'] })
        .then((data) => {
            res.send(data);
            logger.info(`Successfully find review by id: ${id}`);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the book.',
            });
            logger.error(`Error when find review by id ${err.message}`);
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
            logger.info(`Successfully update review by id: ${id}`);
        })
        .catch((err) => {
            res.status(500),
                send({
                    message: err.message || 'Some error occurred while updating review',
                });
            logger.error(`Error when update review by id: ${err.message}`);
        });
};
