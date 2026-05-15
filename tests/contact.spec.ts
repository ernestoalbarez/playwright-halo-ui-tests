import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Contact page', () => {
  test('contact page loads and URL is correct', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('page has a visible heading', async ({ contactPage }) => {
    await expect(contactPage.heading).toBeVisible();
  });

  test('a contact form or contact section is visible', async ({ contactPage }) => {
    const isVisible = await contactPage.isFormVisible();
    expect(isVisible, 'Expected a <form> or a contact section to be visible on /contact').toBe(true);
  });

  test('a submit/send button is present', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /send|submit|contact|get in touch/i });
    await expect(submitBtn).toBeVisible();
  });
});

test.describe('Footer email (Homepage)', () => {
  test('info@halopowered.com is visible in the footer', async ({ homePage, page }) => {
    await homePage.scrollToBottom();
    await expect(page.getByText('info@halopowered.com')).toBeVisible();
  });

  test('footer email is a mailto link', async ({ homePage, page }) => {
    await homePage.scrollToBottom();
    const emailLink = page.locator('a[href="mailto:info@halopowered.com"]');
    await expect(emailLink).toBeVisible();
  });
});
