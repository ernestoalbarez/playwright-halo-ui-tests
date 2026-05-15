import { feature, story, severity, owner } from 'allure-js-commons';
import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Homepage', () => {
  test('page title contains "Halo"', async ({ homePage }) => {
    await feature('Homepage');
    await story('Page Identity');
    await severity('critical');
    await owner('QA');
    await expect(homePage.page).toHaveTitle(/Halo/i);
  });

  test('hero heading "Transforming your vision" is visible', async ({ homePage }) => {
    await feature('Homepage');
    await story('Hero Section');
    await severity('critical');
    await owner('QA');
    await expect(homePage.heroHeading).toBeVisible();
  });

  test('main navigation links are present', async ({ homePage, isMobile }) => {
    await feature('Homepage');
    await story('Navigation');
    await severity('critical');
    await owner('QA');
    if (isMobile || await homePage.isHamburgerVisible()) {
      await homePage.openHamburgerMenu();
    }

    await expect(homePage.navAbout).toBeVisible();
    await expect(homePage.navServices).toBeVisible();
    await expect(homePage.navWork).toBeVisible();
    await expect(homePage.navIndustries).toBeVisible();
    await expect(homePage.navTechnology).toBeVisible();
  });

  test('hamburger menu opens and reveals navigation links @mobile', async ({ homePage, isMobile }) => {
    await feature('Homepage');
    await story('Mobile Navigation');
    await severity('normal');
    await owner('QA');
    test.skip(!isMobile, 'Hamburger menu only exists on mobile viewports');
    await homePage.openHamburgerMenu();
    await expect(homePage.navAbout).toBeVisible();
    await expect(homePage.navWork).toBeVisible();
    await expect(homePage.navServices).toBeVisible();
  });

  test('"Explore Our Work" button is visible', async ({ homePage }) => {
    await feature('Homepage');
    await story('Call to Action');
    await severity('normal');
    await owner('QA');
    await expect(homePage.exploreOurWorkButton).toBeVisible();
  });

  test('footer shows info@halopowered.com email', async ({ homePage }) => {
    await feature('Homepage');
    await story('Footer');
    await severity('minor');
    await owner('QA');
    await homePage.scrollToBottom();
    await expect(homePage.footerEmail).toBeVisible();
  });
});
