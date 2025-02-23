FROM node:18-alpine

WORKDIR /app

# Install system dependencies for Prisma and PostgreSQL client
RUN apk add --no-cache postgresql-client openssl

# Install application dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy and build application source
COPY . .
RUN npm run build

EXPOSE 3000

# The actual command will be set in docker-compose.yml
CMD ["node", "dist/index.js"]