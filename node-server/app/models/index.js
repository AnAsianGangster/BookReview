// mysql db
const dbConfig = require('../config/db.config.js');

// mongo db
const mongoConfig = require('../config/mongodb.config');

// sequelize orm for mysql
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// mongoose odm for mongo
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// db declaration
const db = {};

// ========================== sequelize ========================================
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require('./book.model.js')(sequelize, Sequelize);
db.reviews = require('./review.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);

// associations
db.books.hasMany(db.reviews, {
    foreignKey: 'asin',
    as: 'reviews',
});

db.reviews.belongsTo(db.books, {
    foreignKey: 'asin',
    as: 'book',
});

db.user.hasMany(db.reviews, {
    foreignKey: 'reviewerID',
    as: 'reviews',
});

db.reviews.belongsTo(db.user, {
    foreignKey: 'reviewerID',
    as: 'reviewer',
});

db.role.belongsToMany(db.user, {
    through: 'userRoles',
    foreignKey: 'roleId',
    otherKey: 'reviewerID',
});

db.user.belongsToMany(db.role, {
    through: 'userRoles',
    foreignKey: 'reviewerID',
    otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

// ========================== mongoose =========================================
db.mongoose = mongoose;
db.url = mongoConfig.url;
db.metaBooks = require('./metaBook.model.js')(mongoose);

module.exports = db;
