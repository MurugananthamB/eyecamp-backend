# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (make sure it matches the one used in server.js)
EXPOSE 5000

# Use Nodemon in development, otherwise just run the server
CMD ["node", "server.js"]
