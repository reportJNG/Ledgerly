# Ledgerly

Smart personal finance management for tracking income, expenses, and financial activity in one clean full-stack application.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Overview

Ledgerly is a modern expense tracking web application built with Next.js, TypeScript, Prisma, and PostgreSQL. It helps users create an account, manage income and expenses, search financial records, review dashboard summaries, and update profile settings from a responsive interface with theme support.

The application uses Next.js App Router pages, server actions for backend workflows, Prisma ORM for database access, Zod and React Hook Form for validation, and JWT cookies for session handling.

## Features

- User sign up and login flows
- JWT cookie-based authentication
- Income and expense creation
- Expense listing and search
- Dashboard summaries for revenue, expenses, and net profit
- Date-range dashboard filters for today, last 3 days, last week, and last month
- Profile information editing
- Password update form
- Dark and light theme support
- Responsive UI built with Tailwind CSS, Radix UI/shadcn-style components, and Lucide icons

## Preview

> Screenshots are not committed yet. Add your images to the repository later and replace these placeholders with real paths.

### Dashboard Preview

<!-- Add dashboard screenshot here, for example: ![Dashboard Preview](./public/screenshots/dashboard.png) -->

### Expense Management

<!-- Add expense management screenshot here, for example: ![Expense Management](./public/screenshots/expenses.png) -->

### Authentication

<!-- Add login/signup screenshot here, for example: ![Authentication](./public/screenshots/auth.png) -->

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| UI | Radix UI/shadcn-style components, Lucide React, next-themes, Sonner |
| Forms and Validation | React Hook Form, Zod, @hookform/resolvers |
| Backend | Next.js server actions, Prisma ORM |
| Database | PostgreSQL |
| Auth | JSON Web Tokens, HTTP-only cookies |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ledgerly.git
cd ledgerly
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secure-secret"
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. Sync the Prisma schema with your database:

```bash
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Runs `prisma generate` and creates a production Next.js build. |
| `npm run start` | Starts the production server after a successful build. |

## Project Structure

```text
Ledgerly/
|-- app/                 # Next.js App Router routes and global layout
|-- Backend/             # Server actions and database SQL reference
|-- Frontend/            # Pages, schemas, and reusable UI components
|-- lib/                 # Prisma client setup and shared utilities
|-- prisma/              # Prisma schema and database configuration
|-- package.json         # Scripts and dependencies
`-- README.md            # Project documentation
```

## Database Schema

Ledgerly uses PostgreSQL with Prisma. The current schema contains two main models:

### `users`

Stores registered user accounts.

- `id`: unique user identifier
- `name`: optional display name
- `email`: unique email address
- `password`: user password value
- `created_at`: account creation timestamp
- `expenses`: related expense and income records

### `expenses`

Stores income and expense records for each user.

- `id`: unique record identifier
- `user_id`: owner of the record
- `name`: record name
- `amount`: decimal amount
- `type`: income or expense type
- `category`: record category
- `description`: optional details
- `date`: financial record date
- `created_at`: creation timestamp

The schema includes indexes for user, date, and type queries.

## Deployment

Ledgerly can be deployed on platforms that support Next.js applications and PostgreSQL databases.

Before deploying, configure these production environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-production-secret"
```

The production build command is:

```bash
npm run build
```

This runs:

```bash
prisma generate && next build
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `JWT_SECRET` | Yes | Secret used to sign and verify authentication tokens. |

## Notes

- No screenshots are currently included in the repository.
- No license file is currently included. Add one before publishing if this project will be open source.
- Password handling is implemented in the current app flow, but review security requirements before using the project in production.

## Author

Created by **Your Name**.

Add your portfolio, GitHub profile, or contact link here.
