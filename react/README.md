# React Development Environment Setup

### Create Dockerfile
```
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y curl xz-utils nano tree && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

ENV NVM_DIR="/root/.nvm"
RUN . "$NVM_DIR/nvm.sh" && nvm install --lts && nvm use --lts

RUN echo 'alias ll="ls -la"' >> /root/.bashrc

WORKDIR /app
EXPOSE 5173 24678
```

### Create Docker Compose

```
services:
  dev:
    build: .
    ports:
      - "5173:5173"
      - "24678:24678"
    volumes:
      - .:/app
    stdin_open: true
    tty: true
```

### Build and Run Container
```
docker-compose up -d
docker-compose exec dev bash
```

### Create Vite App in Current Directory
```
npm create vite@latest . -- --template react
```

### Install Dependencies
```
npm install
npm install -D @types/node
```

## Setup @ Alias
### Update vite.config.js:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```
### For TypeScript, add to tsconfig.json:
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Start Development Server
```
npm run dev -- --host
```
Access at http://localhost:5173
