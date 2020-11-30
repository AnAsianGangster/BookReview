module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        asin: {
            type: DataTypes.STRING,
            // NOTE foreign key constrain deprecated
            // references: {
            //     model: 'books',
            //     key: 'asin',
            // },
        },
        helpful: {
            type: DataTypes.FLOAT,
        },
        overall: {
            type: DataTypes.FLOAT,
        },
        reviewText: {
            type: DataTypes.STRING,
        },
        reviewerID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'reviewerID',
            },
        },
        reviewerName: {
            type: DataTypes.STRING,
        },
        summary: {
            type: DataTypes.STRING,
        },
    });

    return Review;
};
