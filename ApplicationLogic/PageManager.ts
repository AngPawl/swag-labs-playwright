import {Page} from '@playwright/test';
import {LoginPage} from './Pages/LoginPage';
import { CatalogPage } from './Pages/CatalogPage';
import { ItemPage } from './Pages/ItemPage';
import { CartPage } from './Pages/CartPage';
import { CheckoutPage } from './Pages/CheckoutPage';
import { CheckoutOverviewPage } from './Pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from './Pages/CheckoutCompletePage';

export class PageManager {
    page: Page;
    loginPage: LoginPage;
    catalogPage: CatalogPage;
    itemPage: ItemPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.catalogPage = new CatalogPage(page);
        this.itemPage = new ItemPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
        this.checkoutCompletePage = new CheckoutCompletePage(page);
    }
}