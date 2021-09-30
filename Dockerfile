###Build Frontend
FROM node:lts-alpine as react

COPY . /usr/src/app
WORKDIR /usr/src/app/frontend/

RUN ls -l && npm install
RUN npm run build

##### 

FROM node:lts-alpine as node-modules

WORKDIR /usr/src/app/

COPY . .

RUN apk add --no-cache sqlite sqlite-dev sqlite-libs
RUN apk add --no-cache python3 python2 make g++ \
    && npm install 
RUN npm run build
RUN ls -l

####

FROM node:lts-alpine

WORKDIR /usr/src/app/

VOLUME [ "/data" ]

ENV DATABASE_URL="file:/data/database.db"

COPY --from=node-modules /usr/src/app/node_modules ./node_modules
COPY --from=node-modules /usr/src/app/dist ./dist
COPY --from=node-modules /usr/src/app/prisma ./prisma

COPY --from=react /usr/src/app/frontend/build ./public
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/bin/sh","/usr/src/app/entrypoint.sh" ]