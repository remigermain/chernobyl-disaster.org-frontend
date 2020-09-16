FROM node

WORKDIR /var/www/nuxt

COPY . .

RUN yarn install
RUN yarn build

ENV HOST 0.0.0.0
