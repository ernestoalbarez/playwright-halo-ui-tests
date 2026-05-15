import { feature, story, severity, owner } from 'allure-js-commons';
import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Navigation', () => {
  test('navigates to /about and page loads', async ({ homePage }) => {
    await feature('Navigation');
    await story('Routing');
    await severity('normal');
    await owner('QA');
    await homePage.page.goto('/about');
    await expect(homePage.page).toHaveURL(/\/about/);
    await expect(homePage.page.getByRole('heading').first()).toBeVisible();
  });

  test('navigates to /services and page loads', async ({ homePage }) => {
    await feature('Navigation');
    await story('Routing');
    await severity('normal');
    await owner('QA');
    await homePage.page.goto('/services');
    await expect(homePage.page).toHaveURL(/\/services/);
    await expect(homePage.page.getByRole('heading').first()).toBeVisible();
  });

  test('navigates to /work and page loads', async ({ homePage }) => {
    await feature('Navigation');
    await story('Routing');
    await severity('normal');
    await owner('QA');
    await homePage.page.goto('/work');
    await expect(homePage.page).toHaveURL(/\/work/);
    await expect(homePage.page.getByRole('heading').first()).toBeVisible();
  });
});
