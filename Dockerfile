# Stage 1 : deps
FROM oven/bun:1.1 AS deps
WORKDIR /app

# Installer Node/npm (nécessaire pour Prisma)
RUN apt-get update && apt-get install -y npm

COPY package.json bun.lock ./

# 🔥 Installer avec npm (pas bun)
RUN npm install

# Générer Prisma
RUN npx prisma generate

# Stage 2 : dev
FROM oven/bun:1.1 AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["bun", "run", "dev"]

# Stage 3 : build
FROM oven/bun:1.1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 4 : runner
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