import { test as base, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ContactPage } from '../../pages/ContactPage.js';
import { WorkPage } from '../../pages/WorkPage.js';

type Fixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
  workPage: WorkPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await use(contactPage);
  },
  workPage: async ({ page }, use) => {
    const workPage = new WorkPage(page);
    await workPage.goto();
    await use(workPage);
  },
});

export { expect };
