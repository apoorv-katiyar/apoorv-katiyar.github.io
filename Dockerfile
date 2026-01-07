# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package.json

# Install dependencies
RUN npm install

# Copy source code
COPY src/ src/
COPY scripts/ scripts/

# Build the site
RUN npm run build

# Output stage - only keep the built artifacts
FROM node:20-alpine

WORKDIR /app

# Copy only the built output from builder
COPY --from=builder /app/dist ./dist

# Expose the dist directory for deployment
VOLUME ["/app/dist"]

CMD ["echo", "Build complete. Check /app/dist for output."]
