# OpenChat

## Setup Instructions

1. Copy contents of `.env.example` to `.env`
2. Update the values in `.env` espcially `OPENPHONE_API_KEY`

3. To run the application (starts both server and client servers):

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the page.
Server running on [http://localhost:9000](http://localhost:9000)

## Architecture Decisions

### Types

- Project uses a shared types file to define API types for the entire project. This is to avoid having to import types from different files.

### Validations

- Client side validation is done using React Hook Form and Zod.

### Frontend

- React + Vite
- Vite
- Tailwind CSS + Shadcn/Radix component library
- TypeScript
- React Query
- React Router
- React Hook Form + Zod
- Express

### Features

- List Phone Numbers
- List Users
-

### Tradeoffs/Assumptions

#### API Proxy

1. Assumes the OpenPhone API would handle unexpected errors, so proxy server only passes request directly to OpenPhone API
2. The client however, handles validation to prevent errors from reaching the API
