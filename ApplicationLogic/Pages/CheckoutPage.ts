import {BasePage} from '../BasePage'
import { UserInfo } from '../../TestData/UserInfo'

export class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);
    };

    Containers = {
        CheckoutInfoContainer: this.page.locator('#checkout_info_container'),
    }

    Form = {
        FirstNameInput: this.Containers.CheckoutInfoContainer.locator('#first-name'),
        LastNameInput: this.Containers.CheckoutInfoContainer.locator('#last-name'),
        PostalCodeInput: this.Containers.CheckoutInfoContainer.locator('#postal-code'),
        ErrorMessage: this.Containers.CheckoutInfoContainer.locator('[data-test="error"]'),
    }

    CheckoutButtons = {
        ContinueButton: this.Containers.CheckoutInfoContainer.locator('#continue'),
        CancelButton: this.Containers.CheckoutInfoContainer.locator('#cancel'),
    }

    async fillUserInfo(user: UserInfo) {
        await this.fillInFirstName(user.firstName);
        await this.fillInLastName(user.lastName);
        await this.fillInPostalCode(user.postalCode);
        await this.continueToOverviewPage();
    }

    async fillInFirstName(firstName: string) {
        await this.Form.FirstNameInput.fill(firstName);
    }

    async fillInLastName(lastName: string) {
        await this.Form.LastNameInput.fill(lastName);
    }

    async fillInPostalCode(postalCode: number) {
        await this.Form.PostalCodeInput.fill(`${postalCode}`);
    }

    async continueToOverviewPage() {
        await this.CheckoutButtons.ContinueButton.click()
    }

    async returnToCartPage() {
        await this.CheckoutButtons.CancelButton.click()
    }
}