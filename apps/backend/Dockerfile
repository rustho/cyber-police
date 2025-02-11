FROM node:18-alpine as base
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


# Production stage
FROM base as production
WORKDIR /app

# Copy built files and dependencies more precisely
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/node_modules ./node_modules
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 5001

# Add verification step
RUN ls -la /app/dist

CMD ["node", "dist/main.js"] 