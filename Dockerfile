FROM node:12.16.3-stretch

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci

CMD ["npm", "start"]