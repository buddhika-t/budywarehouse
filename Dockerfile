FROM node:latest
RUN mkdir -p /usr/src/app
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install  --production --silent
COPY . /usr/src/app
EXPOSE 8080
CMD npm start