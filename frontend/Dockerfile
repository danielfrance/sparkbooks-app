FROM node:18.13.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 3000

ENTRYPOINT [ "scripts/entrypoint.sh" ]
