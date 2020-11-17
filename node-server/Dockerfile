# add alpine and node
FROM alpine:3.8
ENV ALPINE_MIRROR "http://dl-cdn.alpinelinux.org/alpine"
RUN echo "${ALPINE_MIRROR}/edge/main" >> /etc/apk/repositories
RUN apk add --no-cache nodejs-current npm --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

# build
WORKDIR /node-server
COPY . /node-server
RUN npm install
RUN npm prune --production
CMD node server.js
EXPOSE 5000
