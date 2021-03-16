FROM node:alpine

WORKDIR /var/www/nuxt

RUN apk add imagemagick bash yarn

# install node_modules
COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
RUN yarn install

# run prebuild
COPY ./assets assets
COPY ./scripts scripts
RUN yarn before:build

# build app
COPY . .
RUN yarn build

ENV HOST 0.0.0.0
