# Book Review Server Docker Cluster

## Description
#### APP: ExpressJS Sequelize MySQL
#### Authentication: Jsonwebtoken
#### Log: winston mongoDB
#### build: docker-compose to build a docker cluster
#### deployment: terraform
#### build time: t2.micro takes 4 mins to build

## Install
#### install locally as a docker cluster
```shell
docker-compose up
```
#### install on a aws instance using terraform
```shell
mkdir .aws && cd .aws/ && touch credentials
```
#### sample `credentials`
```
[test]
aws_access_key_id = <your aws access key id>
aws_secret_access_key = <your aws secret access key>
```

## Usage

> If installed on aws, `localhost` will change to your aws public ip

root

```
http://localhost:5000
```

API

```
http://localhost:5000/api
```

> Note: There are some sample API calls in `/node-server/resquests.rest`

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
