module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        reviewerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    });

    return User;
};
