import type { Page, Locator } from '@playwright/test';

export class WorkLocators {
  constructor(private page: Page) {}

  getHeading(): Locator {
    return this.page.getByRole('heading').first();
  }

  getFibaProject(): Locator {
    return this.page.locator('a[href="./work-samples/fiba"]');
  }

  getAtmosProject(): Locator {
    return this.page.locator('a[href="./work-samples/atmos"]');
  }
}
