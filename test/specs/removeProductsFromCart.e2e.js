const HomePage     = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage     = require('../pageobjects/cart.page');
const allure      = require('@wdio/allure-reporter').default;

describe('Test Case 17 - Remove Products From Cart', () => {
    it('Deve remover um produto do carrinho', async () => {
        allure.addSeverity('normal');
        allure.addFeature('Carrinho');
        allure.addStory('Remover produto do carrinho');

        // ACT 1 - Home > Products
        allure.startStep('Abrir página inicial e acessar tela de produtos');
        await HomePage.open();
        await ProductsPage.goToProducts();
        allure.endStep();

        // ACT 2 - add  produto ao carrinho
        allure.startStep('Adicionar produto ao carrinho');
        await ProductsPage.addProductToCart(0);
        await ProductsPage.openCartFromModal();
        allure.endStep();

        // ACT 3 -remove o produto do carrinho
        allure.startStep('Remover primeiro produto do carrinho');
        await CartPage.removeFirstProduct();
        allure.endStep();

        // ASSERT
        allure.startStep('Validar que o carrinho está vazio');
        await CartPage.assertCartEmpty();   // aqui valida mensagem "Cart is empty!"
        allure.endStep();

        await browser.pause(3000);
    });
});
