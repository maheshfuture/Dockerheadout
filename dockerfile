# Use a multi-stage build to handle ARM and x86 architectures
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set resource constraints
CMD ["node", "--max-old-space-size=1500", "app.js"]
