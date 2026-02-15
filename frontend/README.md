# BabbelClone — Frontend

This folder contains a minimal Vite + React + TypeScript scaffold for day one frontend work.

Quick start:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

What's included:
- Vite with React plugin
- TypeScript
- Basic routing (`/`)
- Placeholder chat UI under `src/components/ChatSkeleton.tsx`

Backend wiring:
- The frontend reads backend URLs from env: `VITE_BACKEND_HTTP` and `VITE_BACKEND_WS`.
- A local example env is provided in `.env.development` which points to `http://localhost:3000`.

Run frontend + backend locally:

```bash
# in one terminal: start the backend
cd backend
npm install
node server.js

# in another terminal: start the frontend (will pick up .env.development)
cd frontend
npm install
npm run dev

# open http://localhost:5173 (or the port Vite shows)
```

Quick verify steps (server persistence):

1. With the backend running, broadcast a test message via WebSocket:

```bash
cd backend
node -e "const WebSocket=require('ws'); const ws=new WebSocket('ws://localhost:3000/ws'); ws.on('open',()=>{ws.send(JSON.stringify({author:'test',text:'hello via ws'})); ws.close();});"
```

2. Confirm the message was persisted by fetching history:

```bash
curl http://localhost:3000/messages | jq .
```

The frontend will fetch `/messages` on load and subscribe to the WS at the URL from env; open the app to see messages in the UI.

E2E tests (Playwright)
-----------------------
This project includes a minimal Playwright setup that runs the dev server and executes tests.

Install dev deps and browsers:

```bash
cd frontend
npm install
npx playwright install --with-deps
```

Run the tests:

```bash
cd frontend
npx playwright test
```

The included test uses `localStorage` to inject messages so it does not require a backend.

Next steps you may want:
- Add styling system (Tailwind or design tokens)
- Add real chat state + websocket or API
- Add auth flows and user onboarding
