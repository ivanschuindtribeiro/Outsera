import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Define o timeout global do Cucumber para 30 segundos
setDefaultTimeout(30 * 1000);

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && page) {
    const screenshotDir = path.resolve('reports', 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const sanitizedName = scenario.pickle.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const screenshotPath = path.join(screenshotDir, `${sanitizedName}.png`);

    const screenshot = await page.screenshot({ path: screenshotPath });
    this.attach(screenshot, 'image/png');
  }

  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});