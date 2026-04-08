# Stage 1 : deps
FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
RUN bunx --bun prisma generate 

# Stage 2 : dev (utilisé par docker compose en local)
FROM oven/bun:1.1 AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Le code arrive via le volume, pas besoin de COPY ici
EXPOSE 3000
CMD ["bun", "run", "dev"]

# Stage 3 : build
FROM oven/bun:1.1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 4 : runner prod (avec LibreOffice)
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