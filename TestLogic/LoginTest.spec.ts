import {expect} from '@playwright/test';
import {test} from './BaseTest';
import { errorMessage } from '../TestData/ErrorMessages';

test.describe('Login tests', async () => {

  const username = 'standard_user';
  const password = 'secret_sauce';

  test.use({userAuth: undefined})

  test.beforeEach(async ({pageManager}) => {
    await pageManager.loginPage.open();
  })

  test('Login is successful with valid credentials', async ({pageManager}) => {
    await pageManager.loginPage.login(username, password);
    await expect(pageManager.catalogPage.Header.PageTitle).toBeVisible();
  });

  test('Login is unsuccessful with invalid credentials showing error message', async ({pageManager}) => {
    await pageManager.loginPage.login(username + '1', password);
    await expect(pageManager.loginPage.ErrorMessages.Message).toBeVisible();
    await expect(pageManager.loginPage.ErrorMessages.Message).toHaveText(errorMessage.errorNotMatchingCreds);
  });

  test('Login is unsuccessful with empty credentials showing error message', async ({pageManager}) => {
    await pageManager.loginPage.login('', '');
    await expect(pageManager.loginPage.ErrorMessages.Message).toBeVisible();
    await expect(pageManager.loginPage.ErrorMessages.Message).toHaveText(errorMessage.errorEmptyCreds);
  });

  test('Login is unsuccessful with only username filled in showing error message', async ({pageManager}) => {
    await pageManager.loginPage.login(username, '');
    await expect(pageManager.loginPage.ErrorMessages.Message).toBeVisible();
    await expect(pageManager.loginPage.ErrorMessages.Message).toHaveText(errorMessage.errorPasswordRequired);
  });

  test('Login is unsuccessful with only password filled in showing error message', async ({pageManager}) => {
    await pageManager.loginPage.login('', password);
    await expect(pageManager.loginPage.ErrorMessages.Message).toBeVisible();
    await expect(pageManager.loginPage.ErrorMessages.Message).toHaveText(errorMessage.errorUsernameRequired);
  });

  test('Login error message successfully closes', async ({pageManager}) => {
    await pageManager.loginPage.login('', '');
    await pageManager.loginPage.closeErrorMessage();
    await expect(pageManager.loginPage.ErrorMessages.Message).not.toBeVisible();
  });
});

test.describe('Logout tests', async () => {

  test('User successfully logs out', async ({pageManager}) => {
    await pageManager.catalogPage.logoutUser();
    await expect(pageManager.loginPage.Containers.LoginContainer).toBeVisible()
  });
})
