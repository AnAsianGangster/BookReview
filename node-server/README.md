# Book Review Server

## Description

Built using Expressjs, Sequelize ORM.

This, `node-server`, is the server of the Book Review cluster. This container
will do CRUD operations with MySQL database container `mysql-review`. And this
container will log all outward traffic to MongoDB container `logger-mongodb`.

## Installation

Installing this on local and test with local environment.

```shell
$ yarn install
```

### Configuration

Change `.env` file in this folder for your local environment

## Usage

root (default port is `5000`)

```
http://localhost:5000
```

API route

```
http://localhost:5000/api
```

> Note: There are some sample API calls in [resquests.rest](https://github.com/AnAsianGangster/node-server/blob/master/requests.rest)

| Request |         Location          |                             Description |
| ------- | :-----------------------: | --------------------------------------: |
| `POST`  |         /reviews          |                              new review |
| `GET`   |         /reviews          |                         get all reviews |
| `GET`   |       /reviews/`id`       |                      get review with id |
| `PUT`   |       /reviews/`id`       |                   update review with id |
| `POST`  |          /books           |                                new book |
| `GET`   |          /books/          |              get all books with reviews |
| `GET`   |       /books/`asin`       |                        get book with id |
| `PUT`   |       /books/`asin`       |                     update book with id |
| `POST`  |       /auth/signup        |                                new user |
| `POST`  |       /auth/signin        |                       authenticate user |
| `GET`   |   /all/`numberOfBooks`    | public content(default: 5 random books) |
| `GET`   |           /user           |                            user content |
| `GET`   | /userProfile/`reviewerID` |                   user with all reviews |
| `GET`   |           /mod            |                       moderator content |
| `GET`   |          /admin           |                           admin content |

> **WARNING** :exclamation: Need at least five dummy books in database
