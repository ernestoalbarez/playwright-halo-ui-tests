import { feature, story, severity, owner } from 'allure-js-commons';
import { test, expect } from './fixtures/pages.fixture.js';

test.describe('Contact page', () => {
  test('contact page loads and URL is correct', async ({ contactPage }) => {
    await feature('Contact');
    await story('Page Load');
    await severity('critical');
    await owner('QA');
    await expect(contactPage.page).toHaveURL(/\/contact/);
    await expect(contactPage.page.locator('body')).toBeVisible();
  });

  test('page has a visible heading', async ({ contactPage }) => {
    await feature('Contact');
    await story('Page Structure');
    await severity('normal');
    await owner('QA');
    await expect(contactPage.heading).toBeVisible();
  });

  test('a contact form or contact section is visible', async ({ contactPage }) => {
    await feature('Contact');
    await story('Contact Form');
    await severity('critical');
    await owner('QA');
    const isVisible = await contactPage.isFormVisible();
    expect(isVisible, 'Expected a <form> or a contact section to be visible on /contact').toBe(true);
  });

  test('a submit/send button is present', async ({ contactPage }) => {
    await feature('Contact');
    await story('Contact Form');
    await severity('critical');
    await owner('QA');
    const submitBtn = contactPage.page.getByRole('button', { name: /send|submit|contact|get in touch/i });
    await expect(submitBtn).toBeVisible();
  });
});

test.describe('Footer email (Homepage)', () => {
  test('info@halopowered.com is visible in the footer', async ({ homePage }) => {
    await feature('Footer');
    await story('Contact Info');
    await severity('minor');
    await owner('QA');
    await homePage.scrollToBottom();
    await expect(homePage.page.getByText('info@halopowered.com')).toBeVisible();
  });

  test('footer email is a mailto link', async ({ homePage }) => {
    await feature('Footer');
    await story('Contact Info');
    await severity('minor');
    await owner('QA');
    await homePage.scrollToBottom();
    const emailLink = homePage.page.locator('a[href="mailto:info@halopowered.com"]');
    await expect(emailLink).toBeVisible();
  });
});
