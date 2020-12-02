FROM mysql:5.7

ENV MYSQL_DATABASE=BookReview
ENV MYSQL_ROOT_PASSWORD=password
ENV DATABASE_HOST=db

RUN apt update

COPY ./sql-scripts /docker-entrypoint-initdb.d/
COPY ./BookReviewData /

EXPOSE 3306
