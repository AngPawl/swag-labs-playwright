import { item } from '../../TestData/ProductInfo';
import { user } from '../../TestData/UserInfo';
import {expect} from '@playwright/test';
import {test} from '../BaseTest';
import { errorMessage } from '../../TestData/ErrorMessages';

test.describe('Checkout tests', () => {

    test.beforeEach(async ({pageManager, addItemToCart}) => {
        await pageManager.cartPage.open();
    })

    test('Checkout process should be proceeded successfully', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillUserInfo(user);
        await expect(pageManager.checkoutOverviewPage.Summary.SubtotalLabel).toHaveText(`Item total: ${item.price}`)
        await expect(pageManager.checkoutOverviewPage.Summary.TaxLabel).toHaveText(`Tax: ${item.tax}`)
        await expect(pageManager.checkoutOverviewPage.Summary.TotalLabel).toHaveText(`Total: ${item.totalPrice}`)
    })

    test('User cannot proceed to checkout overview page with empty form', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.continueToOverviewPage();
        await expect(pageManager.checkoutPage.Form.ErrorMessage).toHaveText(errorMessage.errorCheckoutEmptyFirstName);
    })

    test('User cannot proceed to checkout overview page with only first name filled in', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillInFirstName(user.firstName);
        await pageManager.checkoutPage.continueToOverviewPage();
        await expect(pageManager.checkoutPage.Form.ErrorMessage).toHaveText(errorMessage.errorCheckoutEmptyLastName);
    })

    test('User cannot proceed to checkout overview page with only last name filled in', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillInLastName(user.lastName);
        await pageManager.checkoutPage.continueToOverviewPage();
        await expect(pageManager.checkoutPage.Form.ErrorMessage).toHaveText(errorMessage.errorCheckoutEmptyFirstName);
    })

    test('User cannot proceed to checkout overview page with only postal code filled in', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillInPostalCode(user.postalCode);
        await pageManager.checkoutPage.continueToOverviewPage();
        await expect(pageManager.checkoutPage.Form.ErrorMessage).toHaveText(errorMessage.errorCheckoutEmptyFirstName);
    })

    test('Checkout Cancel button redirects to Cart page', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.returnToCartPage()
        await expect(pageManager.cartPage.Header.PageTitle).toBeVisible()
    })

    test('Checkout Overview page shows correct item information', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillUserInfo(user);
        await expect(pageManager.checkoutOverviewPage.Item.CartItemName.first()).toHaveText(item.name);
        await expect(pageManager.checkoutOverviewPage.Item.CartItemDescription.first()).toHaveText(item.description);
        await expect(pageManager.checkoutOverviewPage.Item.CartItemPrice.first()).toHaveText(item.price);
    })

    // Bug: redirects to Catalog instead
    test('Checkout Overview Cancel button redirects to Checkout page', async ({pageManager}) => {
        test.fail();
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillUserInfo(user);
        await pageManager.checkoutOverviewPage.returnToCheckoutPage();
        await expect(pageManager.checkoutPage.Form.FirstNameInput).toBeVisible();
        await expect(pageManager.checkoutPage.Form.LastNameInput).toBeVisible();
        await expect(pageManager.checkoutPage.Form.PostalCodeInput).toBeVisible();
    })

    test('Order should be successfully placed', async ({pageManager}) => {
        const pageTitle = 'Thank you for your order!';
        const pageDescription = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillUserInfo(user);
        await pageManager.checkoutOverviewPage.finalizeOrder()
        await expect(pageManager.checkoutCompletePage.CheckoutCompleteContainer.Image).toBeVisible();
        await expect(pageManager.checkoutCompletePage.CheckoutCompleteContainer.Title).toHaveText(pageTitle);
        await expect(pageManager.checkoutCompletePage.CheckoutCompleteContainer.Description).toHaveText(pageDescription);
    })

    test('User should be successfully redirected to catalog page after pressing on Back Home button', async ({pageManager}) => {
        await pageManager.cartPage.goToCheckoutViaCheckoutButton();
        await pageManager.checkoutPage.fillUserInfo(user);
        await pageManager.checkoutOverviewPage.finalizeOrder();
        await pageManager.checkoutCompletePage.returnToCatalog();
        await expect(pageManager.cartPage.Header.PageTitle).toBeVisible();
    })
})