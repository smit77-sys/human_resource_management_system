FROM node:18-bullseye-slim AS builder

WORKDIR /app

# Use host-installed dependencies to avoid in-container npm fetch issues
COPY package*.json ./
COPY node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "dist/server.js"]
