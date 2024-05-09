# Development stage
FROM node:latest AS development

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port for development server
EXPOSE 3001

# Run development server
CMD ["npm", "run", "dev"]

# Production stage
FROM node:latest AS production

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Expose port for production server
EXPOSE 3001

# Run production server
CMD ["npm", "start"]
