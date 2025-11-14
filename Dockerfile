# state build
# use node:18-alpine as base image
FROM node:22-alpine AS builder

# set working directory
WORKDIR /usr/src/application

# copy package.json and pnpm-lock.yaml to working directory
COPY package*.json ./

RUN npm install
# copy all files to working directory
COPY . .

CMD [ "npm", "run", "start" ]



