import {BasePage} from '../BasePage';

export class CatalogPage extends BasePage {

    constructor(page) {
        super(page);
    };

    Containers = {
        HeaderContainer: this.page.locator('#header_container'),
        InventoryContainer: this.page.locator('#inventory_container'), 
        SideMenuContainer: this.page.locator('#menu_button_container'),
    }

    Header = {
        SortByButton: this.Containers.HeaderContainer.locator('[data-test="product_sort_container"]'),
        PageTitle: this.Containers.HeaderContainer.locator('.title'),
        SideMenuButton: this.Containers.HeaderContainer.locator('#react-burger-menu-btn'),
    }

    Item = {
        ItemCard: this.Containers.InventoryContainer.locator('.inventory_item'),
        ItemName: this.Containers.InventoryContainer.locator('.inventory_item_name'),
        ItemDescription: this.Containers.InventoryContainer.locator('.inventory_item_desc'),
        ItemCardPrice: this.Containers.InventoryContainer.locator('.inventory_item_price'),
        AddToCartButton: this.Containers.InventoryContainer.locator('#add-to-cart-sauce-labs-backpack'),
    }

    SideMenu = {
        AllItemsButton: this.Containers.SideMenuContainer.locator('#inventory_sidebar_link'),
        AboutButton: this.Containers.SideMenuContainer.locator('#about_sidebar_link'),
        LogoutButton: this.Containers.SideMenuContainer.locator('#logout_sidebar_link'),
        ResetAppStateButton: this.Containers.SideMenuContainer.locator('#reset_sidebar_link'),
    }

    async sortBy(option: string) {
        await this.Header.SortByButton.selectOption(option);
    }

    async openItemCard(index: number) {
        await this.Item.ItemName.nth(index).click()
    }

    async addItemToCart() {
        await this.Item.AddToCartButton.click()
    }

    async openSideMenu() {
        await this.Header.SideMenuButton.click()
    }

    async logoutUser() {
        await this.openSideMenu()
        await this.SideMenu.LogoutButton.click()
    }
}