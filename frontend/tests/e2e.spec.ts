import { test, expect } from '@playwright/test'

test('renders header and messages from localStorage', async ({ page }) => {
  // pre-populate localStorage before the app loads
  const msgs = [
    { id: 'm1', author: 'Alice', text: 'Hello from Alice', ts: Date.now() - 60000 },
    { id: 'm2', author: 'You', text: 'Reply from you', ts: Date.now() - 30000 }
  ]
  await page.addInitScript((data) => {
    localStorage.setItem('bc_messages', JSON.stringify(data))
  }, msgs)

  await page.goto('/')
  await expect(page.getByText('BabbelClone')).toBeVisible()
  await expect(page.getByText('Hello from Alice')).toBeVisible()
  await expect(page.getByText('Reply from you')).toBeVisible()
})
