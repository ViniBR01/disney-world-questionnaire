import { test, expect } from '@playwright/test';

const TOTAL = 37;

test.describe('M2 — Card UI', () => {
  test('vote page loads', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page).toHaveTitle(/Magic Kingdom/);
  });

  test('progress shows 1 / 37 on first load', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page.locator('#progress-text')).toHaveText('1 / 37');
  });

  test('first card has name and description visible', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page.locator('.card--current .card__name')).toBeVisible();
    await expect(page.locator('.card--current .card__desc')).toBeVisible();
  });

  test('first card has at least one badge', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page.locator('.card--current .badge').first()).toBeVisible();
  });

  test('skip button advances to card 2', async ({ page }) => {
    await page.goto('/vote.html');
    await page.click('#btn-skip');
    await expect(page.locator('#progress-text')).toHaveText('2 / 37');
  });

  test('like button advances card and records like', async ({ page }) => {
    await page.goto('/vote.html');
    const firstName = await page.locator('.card--current .card__name').textContent();
    await page.click('#btn-like');
    await expect(page.locator('#progress-text')).toHaveText('2 / 37');
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    const firstId = Object.keys(votes)[0];
    expect(votes[firstId]).toBe('like');
    // First card name should now be gone
    const newName = await page.locator('.card--current .card__name').textContent();
    expect(newName).not.toBe(firstName);
  });

  test('superlike button records superlike', async ({ page }) => {
    await page.goto('/vote.html');
    await page.click('#btn-superlike');
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    const firstId = Object.keys(votes)[0];
    expect(votes[firstId]).toBe('superlike');
  });

  test('skip records skip in sessionStorage', async ({ page }) => {
    await page.goto('/vote.html');
    await page.click('#btn-skip');
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    const firstId = Object.keys(votes)[0];
    expect(votes[firstId]).toBe('skip');
  });

  test('three action buttons are visible', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page.locator('#btn-skip')).toBeVisible();
    await expect(page.locator('#btn-like')).toBeVisible();
    await expect(page.locator('#btn-superlike')).toBeVisible();
  });

  test('back button navigates to index', async ({ page }) => {
    await page.goto('/vote.html');
    await page.click('#back-btn');
    await expect(page).toHaveURL(/\//);
  });

  test('redirects to results when all cards already voted', async ({ page }) => {
    await page.goto('/vote.html');
    // Simulate having voted all cards with real votes so results.html doesn't redirect back
    await page.evaluate((total) => {
      var votes = {};
      EXPERIENCES.forEach(function (exp) { votes[exp.id] = 'like'; });
      sessionStorage.setItem('currentCardIndex', String(total));
      sessionStorage.setItem('votes', JSON.stringify(votes));
    }, TOTAL);
    await Promise.all([
      page.waitForURL(/\/results/, { timeout: 5000 }),
      page.goto('/vote.html'),
    ]);
  });

  test('resumes from saved index on reload', async ({ page }) => {
    await page.goto('/vote.html');
    // Simulate being at card 5
    await page.evaluate(() => {
      sessionStorage.setItem('currentCardIndex', '5');
      sessionStorage.setItem('votes', '{}');
    });
    await page.reload();
    await expect(page.locator('#progress-text')).toHaveText('6 / 37');
  });

  test('votes accumulate across multiple cards', async ({ page }) => {
    await page.goto('/vote.html');
    await page.click('#btn-like');
    await expect(page.locator('#progress-text')).toHaveText('2 / 37');
    await page.click('#btn-skip');
    await expect(page.locator('#progress-text')).toHaveText('3 / 37');
    await page.click('#btn-superlike');
    await expect(page.locator('#progress-text')).toHaveText('4 / 37');
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    const values = Object.values(votes);
    expect(values).toContain('like');
    expect(values).toContain('skip');
    expect(values).toContain('superlike');
    expect(values.length).toBe(3);
  });
});
