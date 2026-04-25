# --- Stage 1: Build Frontend ---
FROM node:20-bookworm-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
COPY shared/ ../shared/
RUN npm run build

# --- Stage 2: Build & Run Backend ---
FROM node:20-bookworm-slim
WORKDIR /app/backend
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY shared/ ../shared/
RUN npx tsc

COPY --from=frontend-builder /app/frontend/dist ./public

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "dist/index.js"]