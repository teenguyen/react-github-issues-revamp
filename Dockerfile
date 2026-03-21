# Use Node
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching installs)
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start dev server
CMD ["yarn", "run", "ndev", "--hostname", "0.0.0.0"]