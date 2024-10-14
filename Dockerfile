FROM node:20-slim AS base
ARG CI=true

# Set up PNPM environment variables and enable Corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Stage for installing dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Copy the Husky install script (used in the package.json prepare script, will do nothing in CI)
COPY .husky/install.mjs .husky/install.mjs

# Install dependencies using PNPM
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Rebuild esbuild to ensure compatibility with the Docker environment
RUN pnpm rebuild esbuild

# Stage for building the app
FROM deps AS builder
WORKDIR /app
COPY . .
# Build the Remix app
RUN pnpm list
RUN pnpm build

# Stage for setting up the production environment
FROM base AS prod-deps
WORKDIR /app
COPY package*.json ./

# Copy the Husky install script (used in the package.json prepare script, will do nothing in CI)
COPY .husky/install.mjs .husky/install.mjs

# Install only production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --production

# Final stage for running the app
FROM base AS runner
WORKDIR /app
# Create a system user for security
RUN addgroup --system --gid 1001 remix && \
    adduser --system --uid 1001 remix --home /remix
USER remix
RUN cd ~ && ls -la
# Copy production dependencies and build artifacts
COPY --from=prod-deps --chown=remix:remix /app/node_modules /app/node_modules
COPY --from=prod-deps --chown=remix:remix /app/package*.json /app/
COPY --from=builder --chown=remix:remix /app/build /app/build
COPY --from=builder --chown=remix:remix /app/public /app/public

# Start the Remix app
CMD [ "pnpm", "start" ]
