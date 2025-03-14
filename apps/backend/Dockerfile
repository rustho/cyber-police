FROM node:20-alpine as base
RUN npm install -g pnpm

# Builder stage
FROM base as builder
WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copy source code
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

# Build the application
WORKDIR /app/apps/backend
RUN pnpm build
# Add verification after build and show entry points
RUN ls -la dist/ && \
    echo "Looking for possible entry points:" && \
    find dist/ -name "*.js" -type f

# Production stage
FROM base as production
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/node_modules ./node_modules


ENV NODE_ENV=production
# Add HOST environment variable to bind to all interfaces
ENV HOST=0.0.0.0

# Update the entry point to use main.js since that seems to be our main file
CMD ["node", "dist/main.js"] 