FROM node:alpine

WORKDIR /var/www/chernobyl_frontend

COPY . .

RUN apk add imagemagick bash yarn

RUN export $(cat .env | xargs) && yarn install
RUN export $(cat .env | xargs) && yarn build

ENV HOST 0.0.0.0