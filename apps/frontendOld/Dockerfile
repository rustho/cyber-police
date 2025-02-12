FROM node:18-alpine as base
RUN npm install -g pnpm

# Builder stage
FROM base as builder
WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copy source code
COPY apps/frontend ./apps/frontend
COPY packages/shared ./packages/shared

# Build the application
WORKDIR /app/apps/frontend
RUN pnpm build

# Production stage
FROM base as production
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]