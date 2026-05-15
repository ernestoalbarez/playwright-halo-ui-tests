import type { Page, Locator } from '@playwright/test';
import { WorkLocators } from '../locators/WorkLocators.js';

export class WorkPage {
  readonly page: Page;
  private readonly locators: WorkLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new WorkLocators(page);
  }

  get heading(): Locator { return this.locators.getHeading(); }

  async goto(): Promise<void> {
    await this.page.goto('/work');
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
