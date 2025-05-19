# BUILDER
FROM node:20 AS builder
LABEL stage=builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
COPY init.sh ./

ARG ENV
RUN echo "$ENV" > .env

RUN npm run build

RUN rm -rf node_modules

RUN npm ci --omit=dev
RUN npm cache clean --force

# RUNNER
FROM node:20 AS runner
LABEL stage=runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/init.sh ./init.sh

RUN npm install -g ts-node typescript

CMD ["sh", "init.sh"]
