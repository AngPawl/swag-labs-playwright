import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);
    };

    Containers = {
        LoginContainer: this.page.locator('#login_button_container'),
        ErrorMessageContainer: this.page.locator('.error-message-container'),
    };

    TextBoxes = {
        Login: this.Containers.LoginContainer.locator('#user-name'),
        Password: this.Containers.LoginContainer.locator('#password'),
    };

    Buttons = {
        Login: this.Containers.LoginContainer.locator('#login-button'),
        CloseErrorMessage: this.Containers.ErrorMessageContainer.locator('.error-button'),
    }

    ErrorMessages = {
        Message: this.Containers.LoginContainer.locator('[data-test="error"]'),
    }

    async login(username: string, password: string) {
        await this.TextBoxes.Login.fill(username);
        await this.TextBoxes.Password.fill(password);
        await this.Buttons.Login.click();
    }

    async closeErrorMessage() {
        await this.Buttons.CloseErrorMessage.click();
    }

    async open() {
        return await this.page.goto('/');
    }
}

