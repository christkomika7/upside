# Stage 1: deps
FROM oven/bun:1.2-debian AS deps
WORKDIR /app

# Install Node 20 + npm properly
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps
RUN npx prisma generate

# Stage 2: builder
FROM oven/bun:1.2-debian AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# Stage 3: runner
FROM oven/bun:1.2-debian AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && \
    apt-get install -y \
    libreoffice libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-dejavu fonts-liberation \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app ./

EXPOSE 3000
CMD ["bun", "run", "start"]