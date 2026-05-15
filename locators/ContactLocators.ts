import type { Page, Locator } from '@playwright/test';

export class ContactLocators {
  constructor(private page: Page) {}

  getHeading(): Locator {
    return this.page.getByRole('heading').first();
  }

  getForm(): Locator {
    return this.page.locator('form').first();
  }

  getContactSection(): Locator {
    return this.page.locator('[class*="contact"], [id*="contact"]').first();
  }

  getNameField(): Locator {
    return this.page.getByRole('textbox', { name: /name/i });
  }

  getEmailField(): Locator {
    return this.page.getByRole('textbox', { name: /email/i });
  }

  getMessageField(): Locator {
    return this.page
      .getByRole('textbox', { name: /message/i })
      .or(this.page.locator('textarea'));
  }

  getSubmitButton(): Locator {
    return this.page.getByRole('button', { name: /send|submit/i });
  }
}
