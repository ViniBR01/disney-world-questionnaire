import { test, expect } from '@playwright/test';

// Helper: seed sessionStorage with all votes set to a given reaction
async function seedVotes(page, reaction, voterName) {
  await page.goto('/vote.html');
  await page.evaluate(function (args) {
    var votes = {};
    EXPERIENCES.forEach(function (exp) { votes[exp.id] = args.reaction; });
    sessionStorage.setItem('votes', JSON.stringify(votes));
    sessionStorage.setItem('currentCardIndex', String(EXPERIENCES.length));
    sessionStorage.setItem('voterName', args.voterName || '');
  }, { reaction: reaction, voterName: voterName || '' });
}

test.describe('M3 — Results & Edit', () => {
  test('results page redirects to vote when no votes', async ({ page }) => {
    await page.goto('/results.html');
    await expect(page).toHaveURL(/\/vote/);
  });

  test('results page loads after votes are set', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    await expect(page).toHaveTitle(/Magic Kingdom/);
    await expect(page.locator('#results-body')).toBeVisible();
  });

  test('shows voter name in greeting when provided', async ({ page }) => {
    await seedVotes(page, 'like', 'Vovó Rosa');
    await page.goto('/results.html');
    await expect(page.locator('#voter-greeting')).toContainText('Vovó Rosa');
  });

  test('shows generic greeting when no name', async ({ page }) => {
    await seedVotes(page, 'like', '');
    await page.goto('/results.html');
    const greeting = await page.locator('#voter-greeting').textContent();
    expect(greeting).not.toContain('Olá,');
  });

  test('all 37 items appear when all voted like', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    await expect(page.locator('#count-like')).toHaveText('37');
    await expect(page.locator('#count-superlike')).toHaveText('0');
    await expect(page.locator('#count-skip')).toHaveText('0');
  });

  test('all 37 items appear when all voted superlike', async ({ page }) => {
    await seedVotes(page, 'superlike');
    await page.goto('/results.html');
    await expect(page.locator('#count-superlike')).toHaveText('37');
    await expect(page.locator('#count-like')).toHaveText('0');
    await expect(page.locator('#count-skip')).toHaveText('0');
  });

  test('tapping an item cycles its vote', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    // All 37 are in "like" — tap first item → moves to skip
    await page.locator('#section-like .result-item').first().click();
    await expect(page.locator('#count-like')).toHaveText('36');
    await expect(page.locator('#count-skip')).toHaveText('1');
  });

  test('cycle goes superlike → like → skip → superlike', async ({ page }) => {
    await seedVotes(page, 'superlike');
    await page.goto('/results.html');
    const first = page.locator('#section-superlike .result-item').first();
    // superlike → like
    await first.click();
    await expect(page.locator('#count-superlike')).toHaveText('36');
    await expect(page.locator('#count-like')).toHaveText('1');
    // like → skip
    await page.locator('#section-like .result-item').first().click();
    await expect(page.locator('#count-like')).toHaveText('0');
    await expect(page.locator('#count-skip')).toHaveText('1');
    // skip → superlike
    await page.locator('#section-skip .result-item').first().click();
    await expect(page.locator('#count-skip')).toHaveText('0');
    await expect(page.locator('#count-superlike')).toHaveText('37');
  });

  test('vote change persists in sessionStorage', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    const firstName = await page.locator('#section-like .result-item').first().getAttribute('data-id');
    await page.locator('#section-like .result-item').first().click();
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    expect(votes[firstName]).toBe('skip');
  });

  test('submit button is present and disabled in M3', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    const btn = page.locator('#btn-submit');
    await expect(btn).toBeVisible();
    await expect(btn).toBeDisabled();
  });

  test('back button navigates to vote screen', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    await Promise.all([
      page.waitForURL(/\/vote/, { timeout: 5000 }),
      page.click('#back-btn'),
    ]);
  });

  test('existing votes preserved when returning to vote screen', async ({ page }) => {
    await seedVotes(page, 'superlike');
    await page.goto('/results.html');
    await Promise.all([
      page.waitForURL(/\/vote/, { timeout: 5000 }),
      page.click('#back-btn'),
    ]);
    const votes = await page.evaluate(() => JSON.parse(sessionStorage.getItem('votes') || '{}'));
    const values = Object.values(votes);
    expect(values.every(function (v) { return v === 'superlike'; })).toBe(true);
  });

  test('empty state message shown when section has no items', async ({ page }) => {
    await seedVotes(page, 'like');
    await page.goto('/results.html');
    // superlike and skip sections should show empty message
    await expect(page.locator('#empty-superlike')).not.toBeHidden();
    await expect(page.locator('#empty-skip')).not.toBeHidden();
    await expect(page.locator('#empty-like')).toBeHidden();
  });

  test('full end-to-end flow: name → vote 3 cards → arrive at results', async ({ page }) => {
    await page.goto('/');
    await page.fill('#voter-name', 'Vini');
    await page.click('#start-btn');
    await expect(page).toHaveURL(/\/vote/);

    // Vote 3 cards
    await page.click('#btn-superlike');
    await expect(page.locator('#progress-text')).toHaveText('2 / 37');
    await page.click('#btn-like');
    await expect(page.locator('#progress-text')).toHaveText('3 / 37');
    await page.click('#btn-skip');
    await expect(page.locator('#progress-text')).toHaveText('4 / 37');

    // Skip remaining by injecting state
    await page.evaluate(function () {
      var existing = JSON.parse(sessionStorage.getItem('votes') || '{}');
      EXPERIENCES.forEach(function (exp) {
        if (!existing[exp.id]) existing[exp.id] = 'skip';
      });
      sessionStorage.setItem('votes', JSON.stringify(existing));
      sessionStorage.setItem('currentCardIndex', String(EXPERIENCES.length));
    });

    await page.goto('/results.html');
    await expect(page.locator('#voter-greeting')).toContainText('Vini');
    await expect(page.locator('#count-superlike')).toHaveText('1');
    await expect(page.locator('#count-like')).toHaveText('1');
  });
});
