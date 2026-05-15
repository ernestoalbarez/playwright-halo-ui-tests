import type { Page, Locator } from '@playwright/test';
import { HomeLocators } from '../locators/HomeLocators.js';

export class HomePage {
  readonly page: Page;
  private readonly locators: HomeLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new HomeLocators(page);
  }

  // Header / navigation
  get headerLogo(): Locator { return this.locators.getHeaderLogo(); }
  get navAbout(): Locator { return this.locators.getNavAbout(); }
  get navServices(): Locator { return this.locators.getNavServices(); }
  get navWork(): Locator { return this.locators.getNavWork(); }
  get navIndustries(): Locator { return this.locators.getNavIndustries(); }
  get navTechnology(): Locator { return this.locators.getNavTechnology(); }

  // Hero section
  get heroHeading(): Locator { return this.locators.getHeroHeading(); }
  get ctaLetsChatButton(): Locator { return this.locators.getLetsChatButton(); }
  get exploreOurWorkButton(): Locator { return this.locators.getExploreOurWorkButton(); }

  // Footer
  get footerEmail(): Locator { return this.locators.getFooterEmail(); }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async isHamburgerVisible(): Promise<boolean> {
    return await this.locators.getHamburgerMenu().isVisible();
  }
  
  async openHamburgerMenu(): Promise<void> {
    await this.locators.getHamburgerMenu().click();
  }

  async clickLetsChat(): Promise<void> {
    await this.locators.getLetsChatButton().click();
  }

  async clickExploreOurWork(): Promise<void> {
    await this.locators.getExploreOurWorkButton().click();
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
