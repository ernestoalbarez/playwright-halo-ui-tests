import type { Page, Locator } from '@playwright/test';

export class HomeLocators {
  constructor(private page: Page) {}

  getHeaderLogo(): Locator {
    return this.page
      .locator('header a[href="/"], header a[href="https://halopowered.com"]')
      .first();
  }

  // Mobile-only: this element is hidden on desktop viewports.
  getHamburgerMenu(): Locator {
    return this.page.locator('[data-framer-name="menu"]');
  }

  // MOBILE RISK: after the hamburger opens on a Framer site, these links may render
  // inside an overlay <div> rather than a <nav> element. If these assertions fail on
  // mobile after openHamburgerMenu(), widen the scope to this.page.getByRole('link', ...).
  getNavAbout(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: /^About$/i });
  }

  getNavServices(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: /^Services$/i });
  }

  getNavWork(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: /^Work$/i });
  }

  getNavIndustries(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: /^Industries$/i });
  }

  getNavTechnology(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: /^Technology$/i });
  }

  getHeroHeading(): Locator {
    return this.page.getByRole('heading', { name: /Transforming your vision/i });
  }

  getLetsChatButton(): Locator {
    return this.page.getByRole('link', { name: /Let['']s Chat/i }).first();
  }

  getExploreOurWorkButton(): Locator {
    return this.page.getByRole('link', { name: /Explore Our Work/i });
  }

  getFooterEmail(): Locator {
    return this.page.getByText('info@halopowered.com');
  }
}
