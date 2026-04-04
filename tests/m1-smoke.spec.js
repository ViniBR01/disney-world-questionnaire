import { test, expect } from '@playwright/test';

test.describe('M1 — Smoke', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Magic Kingdom/);
  });

  test('hero h1 heading is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('name input is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#voter-name')).toBeVisible();
  });

  test('start button is present and enabled', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#start-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test('start button navigates to vote screen without name', async ({ page }) => {
    await page.goto('/');
    await page.locator('#start-btn').click();
    await expect(page).toHaveURL(/\/vote/);
  });

  test('start button navigates to vote screen with name', async ({ page }) => {
    await page.goto('/');
    await page.fill('#voter-name', 'Vini');
    await page.locator('#start-btn').click();
    await expect(page).toHaveURL(/\/vote/);
  });

  test('name is saved to sessionStorage when provided', async ({ page }) => {
    await page.goto('/');
    await page.fill('#voter-name', 'Grandma Rosa');
    await page.locator('#start-btn').click();
    const name = await page.evaluate(() => sessionStorage.getItem('voterName'));
    expect(name).toBe('Grandma Rosa');
  });

  test('empty name saves empty string to sessionStorage', async ({ page }) => {
    await page.goto('/');
    await page.locator('#start-btn').click();
    const name = await page.evaluate(() => sessionStorage.getItem('voterName'));
    expect(name).toBe('');
  });
});
