import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Navigation', () => {
  test('navigates to /about and page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('navigates to /services and page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveURL(/\/services/);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('navigates to /work and page loads', async ({ page }) => {
    await page.goto('/work');
    await expect(page).toHaveURL(/\/work/);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});
