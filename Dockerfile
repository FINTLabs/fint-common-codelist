# Setting the base to nodejs 7.7.3
FROM node:7.7.3-alpine

# Maintainer
MAINTAINER Frode Sjovatsen


COPY . /server
WORKDIR /server
RUN npm install --production

# Startup
ENTRYPOINT npm start