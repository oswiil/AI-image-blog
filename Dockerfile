FROM node:18.16.1

RUN mkdir /app

COPY package.json package-lock.json /app
WORKDIR /app

RUN npm i
COPY . /app

RUN npm run build
CMD npm run start



