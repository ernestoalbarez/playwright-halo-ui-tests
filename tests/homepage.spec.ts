import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Homepage', () => {
  test('page title contains "Halo"', async ({ page }) => {
    await expect(page).toHaveTitle(/Halo/i);
  });

  test('hero heading "Transforming your vision" is visible', async ({ homePage }) => {
    await expect(homePage.heroHeading).toBeVisible();
  });

  test('main navigation links are present', async ({ homePage, isMobile }) => {
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
    test.skip(!isMobile, 'Hamburger menu only exists on mobile viewports');
    await homePage.openHamburgerMenu();
    await expect(homePage.navAbout).toBeVisible();
    await expect(homePage.navWork).toBeVisible();
    await expect(homePage.navServices).toBeVisible();
  });

  test('"Explore Our Work" button is visible', async ({ homePage }) => {
    await expect(homePage.exploreOurWorkButton).toBeVisible();
  });

  test('footer shows info@halopowered.com email', async ({ homePage }) => {
    await homePage.scrollToBottom();
    await expect(homePage.footerEmail).toBeVisible();
  });
});
