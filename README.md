# Halo Powered — Playwright E2E Test Suite

![Playwright](https://img.shields.io/badge/Playwright-1.60.0-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

End-to-end test suite for [halopowered.com](https://halopowered.com), built with Playwright and TypeScript. Tests run across three desktop browsers and four mobile device emulators. The suite follows the **Page Object Model** pattern with a **custom fixtures layer** that auto-instantiates page objects and handles navigation before each test.

---

## Project structure

```
playwright-halo-ui-tests/
├── playwright.config.ts          # Global config: projects, baseURL, timeouts, artifacts
├── tsconfig.json                 # TypeScript: ES2022 target, NodeNext modules, strict mode
├── package.json                  # ESM project ("type": "module"), npm scripts
├── LICENSE                       # MIT
│
├── locators/                     # Raw Playwright locator factories, one class per page
│   ├── HomeLocators.ts           # Header, hamburger, hero, nav links, footer
│   ├── ContactLocators.ts        # Heading, form fields, submit button
│   ├── WorkLocators.ts           # Heading, project card links
│   └── ServicesLocators.ts       # Heading, service item list
│
├── pages/                        # Page Object Model — actions and accessors built on locators
│   ├── HomePage.ts               # /, navigation, hamburger menu, hero CTAs, footer
│   ├── ContactPage.ts            # /contact, form visibility, field helpers
│   ├── WorkPage.ts               # /work, heading, scroll helper
│   └── ServicesPage.ts           # /services, heading, service count
│
└── tests/
    ├── fixtures/
    │   └── pages.fixture.ts      # Custom test extending base — auto-wires page objects
    ├── homepage.spec.ts          # Title, hero, navigation links, hamburger (@mobile), CTAs
    ├── navigation.spec.ts        # URL routing for /about, /services, /work
    ├── contact.spec.ts           # Contact form visibility, footer email link
    └── work.spec.ts              # /work page load and heading
```

---

## Setup

**Prerequisites:** Node.js 18 or later.

```bash
# 1. Install npm dependencies
npm install

# 2. Download Playwright's browser binaries (run once after cloning)
npx playwright install
```

---

## Running tests

### All tests across all projects

```bash
npx playwright test
# or
npm test
```

### Specific desktop browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# npm aliases
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Specific mobile device

```bash
npx playwright test --project="iPhone 15"
npx playwright test --project="iPhone 15 Pro"
npx playwright test --project="Pixel 7"
npx playwright test --project="Galaxy S8"
```

### Mobile tests only (by tag)

```bash
npx playwright test --grep @mobile
```

### Single spec file

```bash
npx playwright test tests/homepage.spec.ts
npx playwright test tests/contact.spec.ts
```

### Headed mode (visible browser window)

```bash
npx playwright test --headed
# or
npm run test:headed
```

### Interactive UI mode

```bash
npx playwright test --ui
# or
npm run test:ui
```

### Type-check without running tests

```bash
npm run typecheck
```

---

## Device coverage

| Project | Device descriptor | Engine | Viewport |
|---|---|---|---|
| `chromium` | Desktop Chrome | Chromium | 1280 × 720 |
| `firefox` | Desktop Firefox | Firefox | 1280 × 720 |
| `webkit` | Desktop Safari | WebKit | 1280 × 720 |
| `iPhone 15` | iPhone 15 | WebKit | 393 × 659 |
| `iPhone 15 Pro` | iPhone 15 Pro | WebKit | 393 × 659 |
| `Pixel 7` | Pixel 7 | Chromium | 412 × 839 |
| `Galaxy S8` | Galaxy S8 | Chromium | 360 × 740 |

All device descriptors come from `@playwright/test`'s built-in `devices` map — no hardcoded viewport sizes.

---

## Page objects

Each page object lives in `pages/` and composes a matching class from `locators/`. Tests interact only with the page object; selectors are never written directly in spec files.

| Class | Route | Responsibilities |
|---|---|---|
| `HomePage` | `/` | Navigation links, hamburger menu, hero heading, "Let's Chat" and "Explore Our Work" CTAs, footer email, scroll helper |
| `ContactPage` | `/contact` | Heading, form/section visibility check, name / email / message field helpers, submit button |
| `WorkPage` | `/work` | Heading, scroll-to-bottom helper |
| `ServicesPage` | `/services` | Heading, service item count — available for future specs |

### Locator notes

- `[data-framer-name="menu"]` — the hamburger button. It is **mobile-only**; on desktop it is hidden or absent. Tests guard against this with the `isMobile` fixture.
- `getByRole('navigation').getByRole('link', ...)` — navigation link selectors. On a Framer-built site, the mobile overlay menu may render links inside a `<div>` rather than a `<nav>`. If mobile nav assertions fail after the hamburger is opened, remove the `getByRole('navigation')` scope and query `page.getByRole('link', { name: ... })` directly.

---

## Fixtures

`tests/fixtures/pages.fixture.ts` extends Playwright's base `test` using `test.extend<Fixtures>({})`. Each fixture instantiates its page object and calls `goto()` **before the test body runs**, so spec files contain no `beforeEach` boilerplate.

```typescript
// tests/fixtures/pages.fixture.ts
export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();      // navigates to /
    await use(homePage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();   // navigates to /contact
    await use(contactPage);
  },
  workPage: async ({ page }, use) => {
    const workPage = new WorkPage(page);
    await workPage.goto();      // navigates to /work
    await use(workPage);
  },
});
```

**Using fixtures in a spec:**

```typescript
// Import test and expect from the fixture file — not from @playwright/test
import { test, expect } from './fixtures/pages.fixture.js';

test('hero heading is visible', async ({ homePage }) => {
  await expect(homePage.heroHeading).toBeVisible();
});

// Built-in fixtures (page, isMobile) compose naturally alongside custom ones
test('navigation links are present', async ({ homePage, isMobile }) => {
  if (isMobile || await homePage.isHamburgerVisible()) {
    await homePage.openHamburgerMenu();
  }
  await expect(homePage.navAbout).toBeVisible();
});
```

Fixtures marked with `@mobile` in the test title use `test.skip(!isMobile)` to execute only when a mobile device project is active:

```typescript
test('hamburger menu opens and reveals navigation links @mobile', async ({ homePage, isMobile }) => {
  test.skip(!isMobile, 'Hamburger menu only exists on mobile viewports');
  await homePage.openHamburgerMenu();
  await expect(homePage.navAbout).toBeVisible();
});
```

---

## CI / CD

Set `CI=true` in your pipeline environment. The config detects this variable and enables **1 automatic retry** per failing test (`retries: process.env['CI'] ? 1 : 0`). Retries are disabled locally so failures surface immediately during development.

Example GitHub Actions step:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npx playwright test
  env:
    CI: true

- name: Upload HTML report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

On failure, Playwright saves a **screenshot**, a **video**, and a **trace** for every failed test (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `trace: 'retain-on-failure'`). These are embedded in the HTML report.

---

## Reporting

```bash
npx playwright show-report
# or
npm run report
```

Opens the self-contained HTML report in your default browser. The report shows pass/fail status per test per project, failure messages, inline screenshots, and a trace viewer for step-by-step replay of any failure.

---

## Import convention

This project uses `module: NodeNext` (full ESM). All intra-project imports reference the compiled `.js` extension — TypeScript resolves them back to `.ts` at type-check time. This is correct and intentional:

```typescript
import { HomePage } from '../../pages/HomePage.js';
```
