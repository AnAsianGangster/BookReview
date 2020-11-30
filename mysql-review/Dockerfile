FROM mysql:5.7

ENV MYSQL_DATABASE=BookReview
ENV MYSQL_ROOT_PASSWORD=password
ENV DATABASE_HOST=db

RUN apt update
RUN apt install -y unzip
RUN apt install -y wget

COPY ./sql-scripts /docker-entrypoint-initdb.d/

EXPOSE 3306
