# state build
# use node:18-alpine as base image
FROM node:22-alpine AS builder

# add more label for image
LABEL com.example.name="nodejs-hello-world"
LABEL com.example.version="0.0.1-beta"
LABEL com.example.description="A simple Node.js hello world application"

# set working directory
WORKDIR /usr/src/application

# copy package.json and pnpm-lock.yaml to working directory
COPY package*.json ./

RUN npm install
# copy all files to working directory
COPY . .

# build application
RUN npm run build

# state production
FROM node:22-alpine AS runtime

WORKDIR /usr/src/application

# copy dist folder from builder stage
COPY --from=builder /usr/src/application/dist ./dist
COPY --from=builder /usr/src/application/package*.json ./
COPY --from=builder /usr/src/application/node_modules ./node_modules

# create appuser and appgroup
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# switch to appuser
USER appuser

# expose port 3000
EXPOSE 3000

# run application
CMD [ "node", "dist/index.js" ]




