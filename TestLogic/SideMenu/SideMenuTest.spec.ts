import {test} from '../BaseTest';
import { expect } from '@playwright/test';

test.describe('Side menu tests', async () => {

  test.beforeEach(async ({pageManager}) => {
    await pageManager.catalogPage.openSideMenu();
  })

  test('Side Menu has 4 links', async ({pageManager}) => {
    const allItemsTitle = 'All Items';
    const aboutTitle = 'About';
    const logoutTitle = 'Logout';
    const resetAppStateTitle = 'Reset App State';
    
    await expect(pageManager.catalogPage.SideMenu.AllItemsButton).toHaveText(allItemsTitle);
    await expect(pageManager.catalogPage.SideMenu.AboutButton).toHaveText(aboutTitle);
    await expect(pageManager.catalogPage.SideMenu.LogoutButton).toHaveText(logoutTitle);
    await expect(pageManager.catalogPage.SideMenu.ResetAppStateButton).toHaveText(resetAppStateTitle);
  });

  test('About link redirects to Sauce Labs landing site', async ({pageManager}) => {
    const landingURL = 'https://saucelabs.com/';
    
    await pageManager.catalogPage.SideMenu.AboutButton.click();
    expect(pageManager.page.url()).toStrictEqual(landingURL);
  });

  test('All Items link redirects to Catalog page', async ({pageManager}) => {
    await pageManager.catalogPage.SideMenu.AllItemsButton.click();
    await expect(pageManager.catalogPage.Header.PageTitle).toBeVisible();
  });

  // Bug: items are not removed
  test('Reset App State link resets the cart items', async ({pageManager, addItemToCart}) => {
    test.fail();
    await pageManager.cartPage.open();
    await expect(pageManager.cartPage.CartItem.CartItemCard).toHaveCount(1);
    await pageManager.catalogPage.openSideMenu()
    await pageManager.catalogPage.SideMenu.ResetAppStateButton.click();
    await expect(pageManager.cartPage.ShoppingCartIcon.ShoppingCartBadge).not.toBeVisible();
    await expect(pageManager.cartPage.CartItem.CartItemCard).toHaveCount(0);
  });

  // Bug: button states don't reset
  test('Reset App State link resets the item states in catalog', async ({pageManager, addItemToCart}) => {
    test.fail();
    await pageManager.catalogPage.SideMenu.ResetAppStateButton.click();
    await expect(pageManager.cartPage.ShoppingCartIcon.ShoppingCartBadge).not.toBeVisible();
    await expect(pageManager.catalogPage.Item.AddToCartButton).toBeVisible();
  });

});