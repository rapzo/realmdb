FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY tsconfig.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY .env ./

RUN corepack enable
RUN corepack prepare yarn@stable --activate

RUN yarn
RUN yarn build

FROM nginx:stable-alpine-slim as production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
