import type { Page, Locator } from '@playwright/test';

export class ServicesLocators {
  constructor(private page: Page) {}

  getHeading(): Locator {
    return this.page.getByRole('heading').first();
  }

  getServiceItems(): Locator {
    return this.page.locator(
      '[class*="service"], [class*="offering"], section[id*="service"], li[class*="service"]',
    );
  }
}
