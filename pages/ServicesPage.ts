import type { Page, Locator } from '@playwright/test';
import { ServicesLocators } from '../locators/ServicesLocators.js';

export class ServicesPage {
  readonly page: Page;
  private readonly locators: ServicesLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new ServicesLocators(page);
  }

  get heading(): Locator { return this.locators.getHeading(); }
  get serviceItems(): Locator { return this.locators.getServiceItems(); }

  async goto(): Promise<void> {
    await this.page.goto('/services');
  }

  async getHeadingText(): Promise<string | null> {
    return this.locators.getHeading().textContent();
  }

  async getServiceCount(): Promise<number> {
    return this.locators.getServiceItems().count();
  }
}
