import {Page, test as base} from '@playwright/test';
import { LoginPage } from '../ApplicationLogic/Pages/LoginPage';
import { PageManager } from '../ApplicationLogic/PageManager';
import { CatalogPage } from '../ApplicationLogic/Pages/CatalogPage';

export const test = base.extend<{pageManager: PageManager, addItemToCart: AddItemToCart, userAuth: UserAuth}>({

  pageManager: async ({page}, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  userAuth: [async ({ page }, use) => {
    // Set up the fixture.
    const userAuth = new UserAuth(page);
    await userAuth.auth();

    // Use the fixture value in the test.
    await use(userAuth);
  },
    { scope: 'test', auto: true }],

  addItemToCart: async ({ page }, use) => {
    const addItemToCart = new AddItemToCart(page);

    await addItemToCart.AddItemToCart();

    await use(addItemToCart);
  },
});

export class UserAuth {

  constructor(public readonly page: Page) {
    this.page = page;
  }

  async auth() {
    const loginPage = new LoginPage(this.page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  }

}

export class AddItemToCart {

  constructor(public readonly page: Page) {
    this.page = page;
  }
  
  async AddItemToCart() {
    const cartPage = new CatalogPage(this.page);
    await cartPage.addItemToCart();
  }
}
