# Use an official Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only the dependency-related files first (to take advantage of Docker cache)
COPY package.json package-lock.json* ./

# Install all dependencies (prod + dev)
RUN npm install

# Now copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Set default command to run the server
CMD ["node", "dist/index.js"]

# Expose the backend port
EXPOSE 3200
