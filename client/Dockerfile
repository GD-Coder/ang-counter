# Development image with hot reloading

FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json* ./
COPY postcss.config.js ./ 
COPY tailwind.config.js ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Start Angular app with hot reload
CMD ["npm", "run", "start"]
