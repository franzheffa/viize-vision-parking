# --- Build stage ---
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Runtime stage ---
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Next standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Prisma client uses schema at runtime only if migrations are run externally; keep prisma folder for reference.
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.js"]
