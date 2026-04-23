# Use Node.js base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the development server
# --host is necessary for Docker to map the port correctly
CMD ["npm", "run", "dev", "--", "--host"]
