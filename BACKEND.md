# Backend API & WebSocket contract — for Manuel

This document describes the minimal HTTP and WebSocket contract the frontend expects. Keep it small and implementation‑friendly.

Base assumptions
- Default HTTP base: `http://localhost:3000`
- WebSocket endpoint: `ws://localhost:3000/ws`
- Message model (JSON):

```json
{
  "id": "string",        // unique id (server-generated)
  "author": "string",    // user id or display name
  "text": "string",      // message content
  "ts": 1670000000000     // unix ms timestamp
}
```

HTTP API
- GET `/messages`
  - Returns 200 JSON array of messages (ordered oldest → newest).
  - Example: `curl http://localhost:3000/messages`

WebSocket
- Connect to `/ws`.
- Client → Server: send a JSON object with at minimum `{ "author": "alice", "text": "hello" }`.
  - Server MUST assign `id` and `ts` when persisting/broadcasting.
- Server → All clients: broadcast each persisted message as the message JSON (with `id` and `ts`).

Delivery expectations
- Messages received from WS should be broadcast to all connected clients and persisted in server storage.
- The server may also send non-message info events (e.g. `{ "info": "welcome" }`). Clients should tolerate non-message payloads.

Suggested server behaviors (recommended)
- Validate incoming payloads (non-empty `text`, max length limit).
- Assign stable `id` and `ts` on server side (avoid trusting client timestamps).
- Persist messages to durable storage (SQLite or other). Provide `GET /messages` from storage.
- Keep WS connections alive with ping/pong and close inactive sockets.
- Implement rate limiting / basic abuse protection.
- Return CORS headers for the HTTP API (frontend dev runs from Vite).

Optional additions (future)
- Auth: attach a `userId` or token on WS connect (subprotocol or URL param) and include `authorId` in messages.
- ACKs / delivery receipts: server can echo an ack with `ack: true` and the assigned `id`.
- Presence / typing events: separate message types for richer UX.

Examples
- Send a message over WebSocket (node):

```bash
node -e "const WebSocket=require('ws'); const ws=new WebSocket('ws://localhost:3000/ws'); ws.on('open',()=>{ws.send(JSON.stringify({author:'manuel',text:'hi from client'})); setTimeout(()=>ws.close(),500)})"
```

- Fetch history:

```bash
curl http://localhost:3000/messages
```

Notes for Manuel
- The current frontend reads base URLs from env: `VITE_BACKEND_HTTP` and `VITE_BACKEND_WS`.
- The frontend tolerates non-message WS payloads and expects message JSONs to include `id`, `author`, `text`, and `ts`.
- If you want, I can produce a minimal SQLite schema and migration script to match the frontend's expectations.

Migrations (optional)
- A minimal SQL migration and a small Node script were added under `backend/` to help bootstrap a SQLite DB:
  - `backend/migrations/001_init.sql` — creates the `messages` table and index.
  - `backend/migrate.js` — runs the migration using `better-sqlite3`.
  - `backend/package.json` — includes a `migrate` script.

Run migrations:

```bash
cd backend
npm install
npm run migrate
```

This produces `backend/db.sqlite` with the `messages` table. Manuel can ignore or replace these files with his preferred migration strategy.
