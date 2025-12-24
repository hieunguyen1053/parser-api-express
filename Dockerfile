FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Using npm ci for a cleaner, reproducible install based on lockfile
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
