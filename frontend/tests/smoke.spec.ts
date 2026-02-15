import { test, expect } from '@playwright/test';

test('smoke: home loads', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/BabbleClone|BabbelClone|Vite/);
  // basic element check - adjust selector if your app differs
  const header = await page.locator('header');
  await expect(header).toBeVisible();
});
