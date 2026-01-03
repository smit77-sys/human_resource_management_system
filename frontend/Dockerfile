FROM node:18-bullseye-slim

WORKDIR /app

# Use host-installed dependencies to avoid registry downloads during build
COPY package*.json ./
COPY node_modules ./node_modules
COPY . .

# Use pre-built .next from host to avoid network fetch for swc

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "start"]
