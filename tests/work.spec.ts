import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Work page', () => {
  test('work page loads and URL is correct', async ({ page }) => {
    await expect(page).toHaveURL(/\/work/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('page has a visible heading', async ({ workPage }) => {
    await expect(workPage.heading).toBeVisible();
  });
});
