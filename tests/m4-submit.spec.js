import { test, expect } from '@playwright/test';

const SUPABASE_URL = 'https://test.supabase.co';
const SUPABASE_ANON_KEY = 'test-anon-key';

// Inject fake Supabase credentials before each test
test.beforeEach(async ({ page }) => {
  await page.addInitScript(function (creds) {
    window.SUPABASE_URL = creds.url;
    window.SUPABASE_ANON_KEY = creds.key;
  }, { url: SUPABASE_URL, key: SUPABASE_ANON_KEY });
});

// Helper: seed sessionStorage with votes and name
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

test.describe('M4 — Supabase submit', () => {
  test('submit button is enabled when credentials are present', async ({ page }) => {
    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await expect(page.locator('#btn-submit')).toBeEnabled();
  });

  test('submit button is disabled when no credentials', async ({ page }) => {
    // Override init script to clear credentials
    await page.addInitScript(function () {
      window.SUPABASE_URL = '';
      window.SUPABASE_ANON_KEY = '';
    });
    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await expect(page.locator('#btn-submit')).toBeDisabled();
  });

  test('submit sends POST to Supabase with correct payload shape', async ({ page }) => {
    let captured = null;
    await page.route('**/rest/v1/responses', async function (route) {
      captured = JSON.parse(route.request().postData());
      await route.fulfill({ status: 201, body: '' });
    });

    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await page.click('#btn-submit');
    await page.waitForURL(/\/thanks/, { timeout: 5000 });

    expect(captured).not.toBeNull();
    expect(captured.voter_name).toBe('Vini');
    expect(typeof captured.votes).toBe('object');
    expect(Object.keys(captured.votes).length).toBe(37);
  });

  test('voter_name is null when name was left blank', async ({ page }) => {
    let captured = null;
    await page.route('**/rest/v1/responses', async function (route) {
      captured = JSON.parse(route.request().postData());
      await route.fulfill({ status: 201, body: '' });
    });

    await seedVotes(page, 'like', '');
    await page.goto('/results.html');
    await page.click('#btn-submit');
    await page.waitForURL(/\/thanks/, { timeout: 5000 });

    expect(captured.voter_name).toBeNull();
  });

  test('all 37 votes are included in the payload', async ({ page }) => {
    let captured = null;
    await page.route('**/rest/v1/responses', async function (route) {
      captured = JSON.parse(route.request().postData());
      await route.fulfill({ status: 201, body: '' });
    });

    await seedVotes(page, 'superlike', 'Vini');
    await page.goto('/results.html');
    await page.click('#btn-submit');
    await page.waitForURL(/\/thanks/, { timeout: 5000 });

    const values = Object.values(captured.votes);
    expect(values.length).toBe(37);
    expect(values.every(function (v) { return v === 'superlike'; })).toBe(true);
  });

  test('on success navigates to thanks screen', async ({ page }) => {
    await page.route('**/rest/v1/responses', async function (route) {
      await route.fulfill({ status: 201, body: '' });
    });

    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await page.click('#btn-submit');
    await expect(page).toHaveURL(/\/thanks/, { timeout: 5000 });
  });

  test('thanks screen shows confirmation message', async ({ page }) => {
    await page.goto('/thanks.html');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.hero__subtitle')).toContainText('salvas');
  });

  test('on network error shows error message and re-enables button', async ({ page }) => {
    await page.route('**/rest/v1/responses', async function (route) {
      await route.abort('failed');
    });

    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await page.click('#btn-submit');

    await expect(page.locator('#submit-error')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#btn-submit')).toBeEnabled();
    await expect(page.locator('#btn-submit')).toHaveText('Enviar Respostas');
  });

  test('submit uses correct Supabase headers', async ({ page }) => {
    let headers = null;
    await page.route('**/rest/v1/responses', async function (route) {
      headers = route.request().headers();
      await route.fulfill({ status: 201, body: '' });
    });

    await seedVotes(page, 'like', 'Vini');
    await page.goto('/results.html');
    await page.click('#btn-submit');
    await page.waitForURL(/\/thanks/, { timeout: 5000 });

    expect(headers['apikey']).toBe(SUPABASE_ANON_KEY);
    expect(headers['authorization']).toBe('Bearer ' + SUPABASE_ANON_KEY);
    expect(headers['content-type']).toContain('application/json');
  });
});
