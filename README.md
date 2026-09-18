# The Wild Oasis Website

A modern hotel reservation platform built with Next.js that allows guests to browse cabins, create and manage reservations, and update their personal information through a secure authentication system.

## Overview

The Wild Oasis Website is a full-stack booking application where authenticated users can explore available cabins, make reservations, edit or delete existing bookings, and manage their profiles. The project was built using the Next.js App Router and integrates Supabase for data storage and Auth.js for authentication.

## Features

### Authentication

- Google Sign-In with Auth.js
- Protected routes for authenticated users
- Session-based authentication

### Cabin Browsing

- Browse all available cabins
- View detailed cabin information
- Display pricing and discount details

### Reservation Management

- Create new reservations
- View reservation history
- Edit existing reservations
- Delete reservations
- Interactive date selection
- Automatic calculation of booking duration

### Guest Profile

- Update personal information
- Manage nationality and national ID data

### Next.js Features

- App Router
- Server Components
- Server Actions
- Dynamic Routes
- Data Fetching and Caching
- Revalidation

## Tech Stack

### Frontend

- Next.js 14
- React 18
- Tailwind CSS

### Authentication

- Auth.js (NextAuth v5)

### Backend & Database

- Supabase

### Libraries

- React Day Picker
- date-fns
- Heroicons

## Installation

### Clone the repository

```bash
git clone https://github.com/omniatawfek/the-wild-oasis-website.git
cd the-wild-oasis-website
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file:

```env
AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

NEXTAUTH_URL=

SUPABASE_URL=
SUPABASE_KEY=
```

### Run the application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project Structure

```text
app/
├── _components/
├── _lib/
├── account/
├── cabins/
├── reservations/
├── login/
├── api/
└── layout.js
```

## Key Learning Outcomes

- Building full-stack applications with Next.js App Router
- Working with React Server Components
- Implementing Server Actions
- Authentication using Auth.js
- Integrating Supabase with Next.js
- Managing data fetching, caching, and revalidation
- Creating protected user experiences
- Building dynamic booking workflows
