# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install --production

# Copy app source (not copying .env due to .dockerignore)
COPY . .

# Expose port (change if needed)
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
