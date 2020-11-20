CREATE TABLE books (
    asin VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    price FLOAT,
    brand VARCHAR(255),
    imgUrl VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE users (
    reviewerID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE userRoles (
    roleId INT REFERENCES roles(id)
        ON DELETE CASCADE,
    reviewerID INT REFERENCES users(reviewerID)
        ON DELETE CASCADE
);

CREATE TABLE reviews (
    asin VARCHAR(255) REFERENCES books(asin)
        ON DELETE CASCADE,
    helpful FLOAT,
    overall FLOAT,
    reviewText VARCHAR(255),
    reviewerID INT REFERENCES users(reviewerID)
        ON DELETE CASCADE,
    reviewerName VARCHAR(255),
    summary VARCHAR(255)
);
