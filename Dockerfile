# Build BASE
FROM node:20-alpine as BASE

WORKDIR /app
COPY package.json ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean \
    && npm i

# Build Image
FROM node:20-alpine AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Build production
FROM node:20-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.mjs ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
