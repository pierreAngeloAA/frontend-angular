# Angular Frontend - Customer Management

This project is the **frontend** of a customer management system, built with **Angular 22** and **Bootstrap 5**.  
Backend: [backend-api](https://github.com/pierreAngeloAA/backend-api) (Rails API with JWT and Sidekiq).  
It includes authentication, CRUD for customers, and CSV data import.

## Features

- Login and JWT-based authentication
- Logout via route guard
- Customer listing (Customers)
- Create and edit customers
- CSV import of customers (background processing with Sidekiq on the backend)
- Row-level error handling for CSV import

## Technologies

- Angular 22 (standalone components)
- Bootstrap 5
- Reactive Forms
- Angular Router
- TypeScript
- Backend: Rails API (JWT + Sidekiq)
- Basic state management using observables

## Getting started

Requirements: Node 22 and the [backend-api](https://github.com/pierreAngeloAA/backend-api) running on `http://localhost:3000` (its CORS config allows `http://localhost:4200`).

```bash
git clone https://github.com/pierreAngeloAA/frontend-angular.git
cd frontend-angular
npm ci
npm start            # http://localhost:4200
```

Demo login from the backend seeds: `test@example.com` / `password123`.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server on port 4200 |
| `npm run build` | Production build in `dist/` |
| `npm test` | Unit tests in watch mode (Karma + Jasmine) |
| `npm run test:ci` | Unit tests once in Chrome headless, as CI runs them |

The API URL lives in `src/environments/environment.ts` (development) and `environment.prod.ts` (production).
