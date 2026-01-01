FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY src/ ./src/

# Make proxy binary executable
RUN chmod +x ./src/proxy/chrome_proxy_server_linux_amd64 2>/dev/null || true

# Environment
ENV NODE_ENV=production
ENV PORT=7860

EXPOSE 7860

CMD ["node", "src/lightweight-client-express.js"]
