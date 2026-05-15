import { feature, story, severity, owner } from 'allure-js-commons';
import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Work page', () => {
  test('work page loads and URL is correct', async ({ workPage }) => {
    await feature('Work');
    await story('Page Load');
    await severity('normal');
    await owner('QA');
    await expect(workPage.page).toHaveURL(/\/work/);
    await expect(workPage.page.locator('body')).toBeVisible();
  });

  test('page has a visible heading', async ({ workPage }) => {
    await feature('Work');
    await story('Page Structure');
    await severity('minor');
    await owner('QA');
    await expect(workPage.heading).toBeVisible();
  });
});
