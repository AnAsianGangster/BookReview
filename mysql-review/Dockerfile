FROM mysql:5.7

ENV MYSQL_DATABASE=BookReview
ENV MYSQL_ROOT_PASSWORD=password
ENV DATABASE_HOST=db

RUN apt update
RUN apt install -y unzip
RUN apt install -y wget

# TODO shouldn't do this here
# RUN wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip -O kindle-reviews.zip
# RUN unzip kindle-reviews.zip
# RUN rm -rf kindle_reviews.json

# RUN wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
# RUN unzip meta_kindle_store.zip

# RUN rm -rf kindle-reviews.zip meta_kindle_store.zip

COPY ./sql-scripts /docker-entrypoint-initdb.d/

EXPOSE 3306
