import type { Page, Locator } from '@playwright/test';
import { ContactLocators } from '../locators/ContactLocators.js';

export class ContactPage {
  readonly page: Page;
  private readonly locators: ContactLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new ContactLocators(page);
  }

  get heading(): Locator { return this.locators.getHeading(); }
  get form(): Locator { return this.locators.getForm(); }
  get contactSection(): Locator { return this.locators.getContactSection(); }
  get nameField(): Locator { return this.locators.getNameField(); }
  get emailField(): Locator { return this.locators.getEmailField(); }
  get messageField(): Locator { return this.locators.getMessageField(); }
  get submitButton(): Locator { return this.locators.getSubmitButton(); }

  async goto(): Promise<void> {
    await this.page.goto('/contact');
  }

  async isFormVisible(): Promise<boolean> {
    const formVisible = await this.locators.getForm().isVisible().catch(() => false);
    const sectionVisible = await this.locators.getContactSection().isVisible().catch(() => false);
    return formVisible || sectionVisible;
  }

  async fillName(name: string): Promise<void> {
    await this.locators.getNameField().fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.locators.getEmailField().fill(email);
  }

  async fillMessage(message: string): Promise<void> {
    await this.locators.getMessageField().fill(message);
  }
}
