# OpenChat

## Setup Instructions

1. Copy contents of `.env.example` to `.env`
2. Update the values in `.env` especially `OPENPHONE_API_KEY`
3. To run the application (starts both server and client servers):

```bash
pnpm dev
```

4. Or to run servers individually:
   - Server: `pnpm dev:server`
   - Client: `pnpm dev:client`
5. To run tests: `pnpm test`

Open [http://localhost:5173](http://localhost:5173) with your browser to see the page.
Server running on [http://localhost:9000](http://localhost:9000)

## Architecture Decisions

Application was built using React, TypeScript, Tailwind CSS (Shadcn UI), and Vite.

- Form validation using Zod.
- React Query for data fetching and optimistic updates.
- Proxy server to handle API requests to OpenPhone API using Express.
- React testing Library and Vitest for testing.

### Component Structure

- **Sidebar**: Displays a list of phone numbers and users and allows a user select a phone number.
- **Chat**: Displays a chat window with the selected phone number and allows a user to send messages to the other phone number.
- **Error boundary**:  Wrapping the entire app to catch errors that occur during rendering, lifecycle methods, or in event handlers.

### Routing

I used **React Router v7** for routing and state. State in URL is used to persist the state of the application.
**Nuqs** and **Zustand** were considered, however I decided to go with React Router as I liked the idea of having the URL state persist so as to be able to share or bookmark the state of the application.

- /phone/:phoneId: Displays the chat interface for a specific phone number.

### Types

- Project uses a shared types `api` declaration file to define API types for the entire project. This is to avoid having to import types from different files.

## Features

- List Phone Numbers
- List Users
- Retrieve Messages
- Send Messages

## Tradeoffs/Assumptions

### Tradeoffs

1. There are opportunities for improvement with the way messages are viewed and sent.
   Right now, the app only fetches the most recent 10 messages. However, it does not yet support pagination.
   A follow up would be to implement pagination to allow users to view more messages.

2. Currently, users need to click the **send** button to send a message.
   While using the `Enter` key would enhance the user experience, I opted to leave it as is for now, allowing users to press Enter to create a new line.
   As an improvement, we could configure the `Enter` key to send messages, while using `Shift + Enter` for adding a new line.

### Assumptions

1. The app is expected to be responsive, however, it was built specifically for a desktop screen as a dashboard.
2. I assumed the OpenPhone API would handle unexpected errors, so the proxy server only passes request directly to OpenPhone API.
However, some validation is done on the client and server to prevent errors from reaching the API.
