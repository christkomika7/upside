# Stage 1: deps
FROM oven/bun:1.1 AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y npm && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
COPY prisma ./prisma

# Fix: bump typescript floor or skip peer checks
RUN npm install --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate

# Stage 2: builder
FROM oven/bun:1.1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# Stage 3: runner
FROM oven/bun:1.1 AS runner
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