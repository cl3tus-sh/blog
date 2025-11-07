# Build stage
FROM node:20-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built assets with proper ownership
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/next.config.* ./

# Switch to non-root user
USER nextjs

EXPOSE 3000
ENV NODE_ENV=production

CMD ["pnpm", "start"]