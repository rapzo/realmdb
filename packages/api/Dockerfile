FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
COPY src ./src
COPY tsconfig.json .

RUN corepack enable
RUN corepack prepare yarn@stable --activate

RUN yarn
RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY package.json .
COPY --from=builder /app/dist .

RUN yarn install --only=production

COPY .env.production .env

CMD ["node", "index.js"]
