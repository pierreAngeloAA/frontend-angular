# Angular Frontend - Customer Management

This project is the **frontend** of a customer management system, built with **Angular 16** and **Bootstrap 5**.  
It includes authentication, CRUD for customers, and CSV data import.

## Features

- Login and JWT-based authentication
- Logout via route guard
- Customer listing (Customers)
- Create and edit customers
- CSV import of customers (background processing with Sidekiq on the backend)
- Row-level error handling for CSV import

## Technologies

- Angular 16 (Standalone Components)
- Bootstrap 5
- Reactive Forms
- Angular Router
- TypeScript
- Backend: Rails API (JWT + Sidekiq)
- Basic state management using observables

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/frontend-angular.git
cd frontend-angular

2. Install dependencies with Yarn:

yarn install


3 Run the application:

yarn start