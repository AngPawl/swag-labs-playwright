import {BasePage} from '../BasePage'

export class CartPage extends BasePage {

    constructor(page) {
        super(page);
    };

    // TODO: refactor shopping_cart_container

    Containers = {
        HeaderContainer: this.page.locator('#header_container'),
        CartContentContainer: this.page.locator('#cart_contents_container'),
        ShoppingCartIconContainer: this.page.locator('#shopping_cart_container'),

    }

    ShoppingCartIcon = {
        ShoppingCartButton: this.Containers.ShoppingCartIconContainer.locator('.shopping_cart_link'),
        ShoppingCartBadge: this.Containers.ShoppingCartIconContainer.locator('.shopping_cart_badge'),
    }

    Header = {
        PageTitle: this.Containers.HeaderContainer.locator('.title'),
    }

    CartItem = {
        CartItemCard: this.Containers.CartContentContainer.locator('.cart_item'),
        CartItemName: this.Containers.CartContentContainer.locator('.inventory_item_name'),
        CartItemDescription: this.Containers.CartContentContainer.locator('.inventory_item_desc'),
        CartItemPrice: this.Containers.CartContentContainer.locator('.inventory_item_price'),
        CartItemQuantity: this.Containers.CartContentContainer.locator('.cart_quantity'),
        RemoveItemButton: this.Containers.CartContentContainer.locator('#remove-sauce-labs-backpack'),
    }

    CartFooterButtons = {
        CheckoutButton: this.Containers.CartContentContainer.locator('#checkout'),
        ContinueShoppingButton: this.Containers.CartContentContainer.locator('#continue-shopping'),
    }
    
    async removeItemFromCart() {
        await this.CartItem.RemoveItemButton.click()
    }

    async goToCheckoutViaCheckoutButton() {
        await this.CartFooterButtons.CheckoutButton.click()
    }

    async goToCatalogViaContinueShoppingButton() {
        await this.CartFooterButtons.ContinueShoppingButton.click()
    }


    async open() {
        return await this.ShoppingCartIcon.ShoppingCartButton.click()
    }
}