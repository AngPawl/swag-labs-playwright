import { BasePage } from "../BasePage";


export class ItemPage extends BasePage {

    constructor(page) {
        super(page);
    };

    ItemContainer = {
        ItemCard: this.page.locator('.inventory_details_container'),
        ItemName: this.page.locator('.inventory_details_name'),
        ItemDescription: this.page.locator('.inventory_details_desc'),
        ItemPrice: this.page.locator('.inventory_details_price'),
        AddToCartButton: this.page.locator('#add-to-cart-sauce-labs-backpack'),
        RemoveButton: this.page.locator('#remove-sauce-labs-backpack'),
    }
    
    async addItemToCart() {
        await this.ItemContainer.AddToCartButton.click();
    }

    async removeItem() {
        await this.ItemContainer.RemoveButton.click();
    }
}