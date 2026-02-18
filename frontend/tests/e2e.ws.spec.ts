import { test, expect } from '@playwright/test'
import http from 'http'
import { WebSocketServer } from 'ws'

test.describe('WS-backed E2E', () => {
  let server: http.Server
  let wss: WebSocketServer
  let messages: Array<any> = []

  test.beforeAll(async () => {
    messages = [
      { id: 'm1', author: 'me', text: 'Hello from me', ts: Date.now() - 60000 }
    ]

    server = http.createServer((req, res) => {
      if (req.url === '/messages' && req.method === 'GET') {
        const body = JSON.stringify(messages)
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
        res.end(body)
        return
      }
      res.writeHead(404)
      res.end()
    })

    wss = new WebSocketServer({ noServer: true })

    server.on('upgrade', (req, socket, head) => {
      if (req.url === '/ws') {
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req)
        })
      } else {
        socket.destroy()
      }
    })

    wss.on('connection', (ws) => {
      // send welcome
      try { ws.send(JSON.stringify({ info: 'welcome' })) } catch {}

      ws.on('message', (data) => {
        try {
          const parsed = JSON.parse(data.toString())
          if (parsed && typeof parsed.text === 'string') {
            const msg = { id: String(Date.now()) + Math.random().toString(36).slice(2,6), author: parsed.author || 'anon', text: parsed.text, ts: Date.now() }
            messages.push(msg)
            const out = JSON.stringify(msg)
            // broadcast
            wss.clients.forEach(c => {
              try { c.send(out) } catch {}
            })
          }
        } catch (e) {}
      })
    })

    await new Promise<void>((resolve, reject) => {
      server.listen(3000, (err?: any) => err ? reject(err) : resolve())
    })
  })

  test.afterAll(async () => {
    try { wss.close() } catch {}
    await new Promise<void>((resolve) => server.close(() => resolve()))
  })

  test('connects to WS backend and broadcasts messages', async ({ page }) => {
    // Navigate to app (Playwright's webServer starts Vite)
    await page.goto('/')

    // initial server message should be visible (from 'me')
    await expect(page.getByText('Hello from me')).toBeVisible()

    // send a message via UI
    const input = page.locator('input[placeholder="Type a message..."]')
    await input.fill('Automated test message')
    await page.getByRole('button', { name: /send/i }).click()

    // page should eventually show the sent message (broadcast from mock server)
    await expect(page.getByText('Automated test message')).toBeVisible({ timeout: 5000 })
  })
})
