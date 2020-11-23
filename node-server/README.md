# Book Review Server

<!-- table of contents -->

-   [Description](#Description)
    -   [File Structure](#File-Structure)
-   [Installation](#Installation)
    -   [Configuration](#Configuration)
-   [Usage](#Usage)

## Description

Built using Expressjs, Sequelize ORM.

This, `node-server`, is the server of the Book Review cluster. This container
will do CRUD operations with MySQL database container `mysql-review`. And this
container will log all outward traffic to MongoDB container `logger-mongodb`.

### File Structure

This server **strictly** follow MVC design pattern

Structure

```sh
.
├── app
│   ├── config # configuration files
│   │   ├── auth.config.js
│   │   ├── db.config.js
│   │   └── logger.config.js
│   ├── controllers # CRUD controllers
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── review.controller.js
│   │   └── user.controller.js
│   ├── middleware # middleware functions mostly jwt (log is in logger.config.js)
│   │   ├── authJwt.js
│   │   ├── index.js # expose all middleware functions
│   │   └── verifySignUp.js
│   ├── models # sequelize models
│   │   ├── book.model.js
│   │   ├── index.js # expose all models to controllers
│   │   ├── review.model.js
│   │   ├── role.model.js
│   │   └── user.model.js
│   └── routes # all routes, and combine middleware functions
│       ├── auth.routes.js # signup, signin and jwt
│       ├── book.routes.js
│       ├── index.routes.js # expose all routes to server.js
│       ├── review.routes.js
│       └── user.routes.js # user contents
├── .env # environment configuration (ports and links for docker)
├── package.json # dependencies
├── requests.rest # sample test with rest client VS Code pluggin
└── server.js # server instances / entry point
```

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
