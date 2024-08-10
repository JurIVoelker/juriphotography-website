FROM node:18-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /app
COPY package.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

COPY . .
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "start"]
