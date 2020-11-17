const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const db = require('../models/index');
const sequelize = require('sequelize');
const Book = db.books;
const User = db.user;

// public content
exports.allAccess = (req, res) => {
    const numberOfBooks = parseInt(req.params.numberOfBooks) || 5;

    Book.findAll({ order: [[sequelize.literal('RAND()')]], limit: numberOfBooks }).then((data) => {
        res.status(200).send(data);
    });
};

// user content
exports.userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

// user profile
exports.userProfile = (req, res) => {
    const token = req.headers['x-access-token'];
    const reviewerID = parseInt(req.params.reviewerID);

    jwt.verify(token, config.secret, (err, decoded) => {
        if (reviewerID != decoded.id) {
            return res.status(401).send({
                message: 'Unauthorized!',
            });
        } else {
            return User.findByPk(reviewerID, { include: ['reviews'] })
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || 'Some error occurred while finding reviews by user.',
                    });
                });
        }
    });
};

// admin content
exports.adminBoard = (req, res) => {
    res.status(200).send('Admin Content.');
};

// moderator content
exports.moderatorBoard = (req, res) => {
    res.status(200).send('Moderator Content.');
};
