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

  test('first card has a category bar with label and year', async ({ page }) => {
    await page.goto('/vote.html');
    await expect(page.locator('.card--current .card__category-bar')).toBeVisible();
    await expect(page.locator('.card--current .catbar__label')).toBeVisible();
    await expect(page.locator('.card--current .catbar__year')).toBeVisible();
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

  test('photo nav: next arrow advances to second photo', async ({ page }) => {
    await page.goto('/vote.html');
    // First card has multiple photos — next button should be visible
    const nextBtn = page.locator('.card--current .photo-nav--next');
    await expect(nextBtn).toBeVisible();
    // Prev button starts hidden
    await expect(page.locator('.card--current .photo-nav--prev')).toHaveClass(/photo-nav--hidden/);
    // Click next
    await nextBtn.click();
    // Active dot should now be the second one
    const dots = page.locator('.card--current .photo-dot');
    await expect(dots.nth(1)).toHaveClass(/photo-dot--active/);
    await expect(dots.nth(0)).not.toHaveClass(/photo-dot--active/);
    // Prev button now visible, next button may still be visible (3 photos)
    await expect(page.locator('.card--current .photo-nav--prev')).not.toHaveClass(/photo-nav--hidden/);
  });

  test('photo nav: prev arrow goes back to first photo', async ({ page }) => {
    await page.goto('/vote.html');
    await page.locator('.card--current .photo-nav--next').click();
    await page.locator('.card--current .photo-nav--prev').click();
    const firstDot = page.locator('.card--current .photo-dot').first();
    await expect(firstDot).toHaveClass(/photo-dot--active/);
    await expect(page.locator('.card--current .photo-nav--prev')).toHaveClass(/photo-nav--hidden/);
  });

  test('photo nav: voting advances to next card and resets to first photo', async ({ page }) => {
    await page.goto('/vote.html');
    // Navigate to second photo
    await page.locator('.card--current .photo-nav--next').click();
    // Vote — should advance card and reset photo index
    await page.click('#btn-like');
    await expect(page.locator('#progress-text')).toHaveText('2 / 37');
    // New card should show first photo (prev arrow hidden)
    await expect(page.locator('.card--current .photo-nav--prev')).toHaveClass(/photo-nav--hidden/);
    const firstDot = page.locator('.card--current .photo-dot').first();
    await expect(firstDot).toHaveClass(/photo-dot--active/);
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
