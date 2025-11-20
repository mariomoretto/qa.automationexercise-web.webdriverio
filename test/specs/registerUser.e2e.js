const HomePage    = require('../pageobjects/home.page');
const LoginPage   = require('../pageobjects/login.page');
const SignupPage  = require('../pageobjects/signup.page');
const AccountPage = require('../pageobjects/account.page');
const userData    = require('../data/userData');
const allure      = require('@wdio/allure-reporter').default;

describe('Test Case 1 - Registrar Usuário', () => {
    it('Deve registrar, validar e deletar usuário', async () => {

        allure.addFeature('Cadastro de Usuário');
        allure.addStory('Usuário cria conta, acessa e exclui o cadastro');
        allure.addSeverity('critical');

        // ARRANGE
        const user = userData.userDefault;   // objeto base
        const fakeEmail = user.email;        // getter p/ gerar email dinamico
        const name      = user.name;

        // ACT
        allure.startStep('Abrir página inicial');
        await HomePage.open();
        allure.endStep();

        allure.startStep('Acessar tela de Signup/Login');
        await HomePage.clickSignupLogin();
        allure.endStep();

        allure.startStep('Preencher nome e e-mail na tela de Signup');
        await LoginPage.signup(name, fakeEmail);
        allure.endStep();

        allure.startStep('Preencher formulário completo de cadastro');
        await SignupPage.fillForm(user);
        allure.endStep();

        allure.startStep('Confirmar criação da conta e excluir usuário');
        await AccountPage.clickContinue();
        await AccountPage.deleteAccount();
        allure.endStep();

        // ASSERT
        allure.startStep('Validar que a conta foi removida com sucesso');
        await AccountPage.assertAccountDeleted();
        allure.endStep();
    });
});
