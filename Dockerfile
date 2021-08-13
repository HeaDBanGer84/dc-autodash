FROM node:lts-alpine

WORKDIR /usr/src/app/

COPY . .

RUN apk add --no-cache sqlite sqlite-dev sqlite-libs
RUN apk add --no-cache --virtual .gyp python3 python2 make g++ \
    && npm install -g ts-node @types/node \
    && npm install  \
    && apk del .gyp

EXPOSE 3000

CMD [ "npm", "start" ]