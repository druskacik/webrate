# Dockerfile
FROM node:18.14.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/app/
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]