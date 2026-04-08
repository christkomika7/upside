# Stage 1: deps
FROM node:20-slim AS deps
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps
RUN npx prisma generate --output ../app/generated/prisma

# Stage 2: builder
FROM node:20-slim AS builder
WORKDIR /app

RUN npm install -g bun

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/app/generated ./app/generated
COPY . .

RUN bun run build

# Stage 3: runner
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && \
    apt-get install -y \
    libreoffice libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-dejavu fonts-liberation \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install -g bun

COPY --from=builder /app ./

EXPOSE 3000
CMD ["bun", "run", "start"]