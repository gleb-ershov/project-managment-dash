FROM node:22-alpine as base



FROM base as deps

WORKDIR /app

COPY package.json yarn.lock

RUN yarn install --frozen-lockfile



FROM base as builder



FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production