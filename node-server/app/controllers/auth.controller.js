const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const logger = require('../config/logger.config');

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then((user) => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles,
                        },
                    },
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({
                            message: 'User was registered successfully!',
                        });
                        logger.info(`Successfully registered user: ${user.username}`);
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: 'User was registered successfully!' });
                    logger.info(`Successfully registered user with default role: ${user.username}`);
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            logger.error(`Error creating user: ${err.message}`);
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then((user) => {
            if (!user) {
                logger.error('Error user Not found when signin');
                return res.status(404).send({ message: 'User Not found.' });
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                logger.error('Error invalid password when signin');
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password!',
                });
            }

            var token = jwt.sign({ id: user.reviewerID }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            var authorities = [];
            user.getRoles().then((roles) => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push('ROLE_' + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    reviewerID: user.reviewerID,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                });
                logger.info(`Successsfully sigin user: ${user.reviewerID}`);
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            logger.error(`Error when sign in: ${err.message}`);
        });
};
