module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        asin: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        brand: {
            type: DataTypes.STRING,
        },
        imgUrl: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    });

    return Book;
};
