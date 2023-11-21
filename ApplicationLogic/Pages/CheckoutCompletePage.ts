import {BasePage} from '../BasePage';

export class CheckoutCompletePage extends BasePage {

    constructor(page) {
        super(page);
    };

    CheckoutCompleteContainer = {
        Image: this.page.locator('.checkout_complete_container img'),
        Title: this.page.locator('.complete-header'),
        Description: this.page.locator('.complete-text'),
    }

    Buttons = {
        BackHome: this.page.locator('#back-to-products'),
    }

    async returnToCatalog() {
        await this.Buttons.BackHome.click()
    }
}