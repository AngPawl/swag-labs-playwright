import {test} from '../BaseTest';
import { item } from '../../TestData/ProductInfo';
import { expect } from '@playwright/test';

test.describe('Item tests', () => {

    test.beforeEach(async ({pageManager}) => {
        await pageManager.catalogPage.openItemCard(item.id);
    })

    test('Item card should display correct info', async ({pageManager}) => {
        await expect(pageManager.itemPage.ItemContainer.ItemName).toHaveText(item.name);
        await expect(pageManager.itemPage.ItemContainer.ItemDescription).toHaveText(item.description);
        await expect(pageManager.itemPage.ItemContainer.ItemPrice).toHaveText(item.price);
    })

    test('Item should be successfully added to the cart', async ({pageManager}) => {
        const cartPageTitle = 'Your Cart';
        
        await pageManager.itemPage.addItemToCart();
        await pageManager.cartPage.open();
        await expect(pageManager.cartPage.Header.PageTitle).toHaveText(cartPageTitle);
        await expect(pageManager.cartPage.ShoppingCartIcon.ShoppingCartBadge).toHaveText('1');
        await expect(pageManager.cartPage.CartItem.CartItemCard).toHaveCount(1);
        await expect(pageManager.cartPage.CartItem.CartItemQuantity).toHaveText('1');
        await expect(pageManager.cartPage.CartItem.CartItemName).toHaveText(item.name);
    })

    test('Item should be successfully removed from the cart by clicking on Remove button', async ({pageManager}) => {
        await pageManager.itemPage.addItemToCart();
        await pageManager.itemPage.removeItem();
        await expect(pageManager.itemPage.ItemContainer.AddToCartButton).toBeVisible();
    })

})