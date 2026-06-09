# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/online-store /app

ENV HOST=0.0.0.0
ENV PORT=4000

EXPOSE 4000

CMD ["node", "server/server.mjs"]
