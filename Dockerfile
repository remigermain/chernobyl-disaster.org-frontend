FROM node:alpine

WORKDIR /var/www/nuxt

COPY . .

RUN apk add imagemagick bash

RUN export $(cat .env | xargs) && yarn install
RUN export $(cat .env | xargs) && yarn build

ENV HOST 0.0.0.0
