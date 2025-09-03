React Development Environment

Docker-based development environment for React with Next.js, TypeScript, and Tailwind CSS v3.
Demonstrates the use of Redux Toolkit store and Zustand store for global application state management.
For pure React states, refer to the React primer project.

# Table of Contents

Table of contents, where amount columns is sortable.
With 2 date fields. Filter button restricts table content to only show items in date range.

## Setup
### Build and Start Container
```
docker compose up -d

docker compose exec react-dev bash
```
### Create Next.js Project

Recommended (Tailwind CSS v3):
Use the bare-minimum template, then add Tailwind v3 in step 3.
```
npx create-next-app@latest . \
  --ts --no-eslint --no-tailwind --app --src-dir --use-npm \
  --import-alias "@/*"
```

Create/Edit next.config.ts (this exposes the app to 0.0.0.0 host for Docker)
```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    },
  }),
};

export default nextConfig;

```

### Add Missing Dependencies (if using bare minimum)

Add ESLint:
```
npm install -D eslint eslint-config-next
```
Create .eslintrc.json:
```
{
  "extends": "next/core-web-vitals"
}
```
Add Tailwind CSS v3 (Current Stable):
```
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p
```
Now update your globals.css to use the v3 syntax:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Edit tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Import in your app (e.g., src/app/layout.tsx):
```
import '../assets/styles/app.css';
```

### Install Redux Toolkit Store
```
npm install @reduxjs/toolkit react-redux
```

### Install Zustand Store
```
npm install zustand
```

### Start Development Server
Final package.json (with exposed 0.0.0.0 host for Container access)
```
{
  "name": "tmp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -H 0.0.0.0",
    "build": "next build --turbopack",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.5.0",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.34.0",
    "eslint-config-next": "^15.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}

```

```
npm run dev
```
## File Structure
```
project/
├── Dockerfile
├── docker-compose.yml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── TxnsTable.tsx
│   └── assets/
│   │   └── styles/
│   │       └── app.css
│   └── stores/
│   │   └── store.tsx
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
└── .eslintrc.json
```
Notes

- Tailwind CSS v3 uses tailwind.config.js for configuration
- The container runs sleep infinity so you can bash into it to create projects
- Node.js, npm, and npx are available globally
- Development server runs on port 3000
