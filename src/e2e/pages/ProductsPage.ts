import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_link');
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productItem.locator('button').click();
  }

  async openCart() {
    await this.cartBadge.click();
  }
}