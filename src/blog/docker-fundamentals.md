---
title: "Docker Fundamentals: Containerize Your Applications"
author: "Tech Writer"
pubDate: 2024-01-30
tags: ["docker", "devops", "containers", "deployment"]
description: "Learn Docker basics and how to containerize your applications for consistent deployment"
---

Docker has revolutionized how we develop, ship, and run applications. By containerizing your applications, you ensure they run consistently across different environments, from your laptop to production servers.

## What is Docker?

Docker is a platform that packages applications and their dependencies into containers. A container is a lightweight, standalone executable package that includes everything needed to run the application.

## Key Concepts

- **Image**: A template containing application code and dependencies
- **Container**: A running instance of an image
- **Dockerfile**: Instructions for building an image
- **Docker Hub**: A registry for storing and sharing images

## Your First Dockerfile

Here's a simple Dockerfile for a Node.js application:

```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
```

## Building and Running

```bash
# Build an image
docker build -t my-app:1.0 .

# Run a container
docker run -p 3000:3000 my-app:1.0

# Run in detached mode
docker run -d -p 3000:3000 my-app:1.0

# View running containers
docker ps

# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>
```

## Docker Compose

For multi-container applications, use Docker Compose:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Run with: `docker-compose up`

## Best Practices

1. **Use official base images**: They're maintained and secure
2. **Minimize layers**: Combine RUN commands when possible
3. **Use .dockerignore**: Exclude unnecessary files
4. **Don't run as root**: Create a non-root user
5. **Multi-stage builds**: Reduce final image size

```dockerfile
# Multi-stage build example
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/server.js"]
```

## Common Commands

```bash
# List images
docker images

# Remove image
docker rmi <image-id>

# View logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> sh

# Clean up unused resources
docker system prune -a
```

Docker simplifies deployment and ensures consistency. Start by containerizing a simple app, then gradually adopt it across your projects.
