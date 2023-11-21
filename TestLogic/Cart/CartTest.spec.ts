import { item } from '../../TestData/ProductInfo';
import {test} from '../BaseTest';
import { expect } from '@playwright/test';

test.describe('Cart tests', () => {

    test.beforeEach (async ({pageManager, addItemToCart}) => {
        await pageManager.cartPage.open();
    })

    test('Item should be successfully removed from the cart', async ({pageManager}) => {
        await pageManager.cartPage.removeItemFromCart()
        await expect(pageManager.cartPage.CartItem.CartItemCard).toHaveCount(0)
    })

    // via JSON
    test('Item info should be displayed', async ({pageManager}) => {
        await expect(pageManager.cartPage.CartItem.CartItemName.first()).toHaveText(item.name);
        await expect(pageManager.cartPage.CartItem.CartItemDescription.first()).toHaveText(item.description);
        await expect(pageManager.cartPage.CartItem.CartItemPrice.first()).toHaveText(item.price);
    })

    // Bug: it allows to place an empty order
    test('User cannot proceed to checkout page with empty cart', async ({pageManager}) => {
        test.fail();
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();

        await expect(pageManager.cartPage.ShoppingCartIcon.ShoppingCartBadge).not.toBeVisible()
        await expect(pageManager.cartPage.CartItem.CartItemCard).toBeVisible()
    })

    test('User is successfully redirected to Catalog page via Continue Shopping button', async ({pageManager}) => {
        await pageManager.cartPage.goToCatalogViaContinueShoppingButton();
        await expect(pageManager.catalogPage.Header.PageTitle).toBeVisible();
    })

})