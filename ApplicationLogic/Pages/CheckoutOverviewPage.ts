import {BasePage} from '../BasePage';

export class CheckoutOverviewPage extends BasePage {

    constructor(page) {
        super(page);
    };

    Containers = {
        SummaryContainer: this.page.locator('#checkout_summary_container'),
    }

    Summary = {
        CartList: this.Containers.SummaryContainer.locator('.cart_list'),
        SummaryInfo: this.Containers.SummaryContainer.locator('.summary_info'),
        SubtotalLabel: this.Containers.SummaryContainer.locator('.summary_subtotal_label'),
        TaxLabel: this.Containers.SummaryContainer.locator('.summary_tax_label'),
        TotalLabel: this.Containers.SummaryContainer.locator('.summary_total_label'),

    }

    Item = {
        CartItemCard: this.Summary.CartList.locator('.cart_item'),
        CartItemName: this.Summary.CartList.locator('.inventory_item_name'),
        CartItemDescription: this.Summary.CartList.locator('.inventory_item_desc'),
        CartItemPrice: this.Summary.CartList.locator('.inventory_item_price'),
        CartItemQuantity: this.Summary.CartList.locator('.cart_quantity'),
        RemoveItemButton: this.Summary.CartList.locator('#remove-sauce-labs-backpack'),
    }

    CartFooterButtons = {
        CancelButton: this.Containers.SummaryContainer.locator('#cancel'),
        FinishButton: this.Containers.SummaryContainer.locator('#finish'),
    }

    async finalizeOrder() {
        await this.CartFooterButtons.FinishButton.click()
    }

    async returnToCheckoutPage() {
        await this.CartFooterButtons.CancelButton.click()
    }
}