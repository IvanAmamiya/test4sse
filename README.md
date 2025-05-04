# SSE Test Project

This project is a simple Next.js application that demonstrates the use of Server-Sent Events (SSE) to stream data from the server to the client.

## Project Structure

```
test4sse
├── src
│   ├── app
│   │   ├── page.tsx        # Main page component for the application
│   │   └── api
│   │       └── sse.ts      # SSE endpoint implementation
│   └── types
│       └── index.ts        # TypeScript types and interfaces
├── package.json             # npm configuration file
├── next.config.js           # Next.js configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd test4sse
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

The application sets up an SSE connection to stream data from the server. You can modify the `src/app/api/sse.ts` file to customize the data being sent to the client.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.