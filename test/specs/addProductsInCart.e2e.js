const HomePage     = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage     = require('../pageobjects/cart.page');
const allure      = require('@wdio/allure-reporter').default;

describe('Test Case 12 - Add Products in Cart', () => {
    it('Deve adicionar dois produtos no carrinho e validar valores', async () => {
        // meta Allure
        allure.addSeverity('critical');
        allure.addFeature('Carrinho');
        allure.addStory('Adicionar dois produtos e validar valores');

        // ARRANGE
        const firstProductPrice  = 500; // Blue Top
        const secondProductPrice = 400; // Man Tshirt

        // ACT 1 - Abrir home e ir para Products
        allure.startStep('Abrir página inicial e acessar tela de produtos');
        await HomePage.open();
        await ProductsPage.goToProducts();
        allure.endStep();

        // ACT 2 - Adicionar primeiro produto
        allure.startStep('Adicionar primeiro produto ao carrinho');
        await ProductsPage.addProductToCart(0);     // 1º card
        await ProductsPage.openCartFromModal();     // botão "View Cart"
        allure.endStep();

        // voltar para a tela de produtos (caso esteja no carrinho)
        allure.startStep('Voltar para tela de produtos');
        await browser.back();
        allure.endStep();

        // ACT 3 - Adicionar segundo produto
        allure.startStep('Adicionar segundo produto ao carrinho');
        await ProductsPage.addProductToCart(1);     // 2º card
        await ProductsPage.openCartFromModal();     // botão "View Cart"
        allure.endStep();

        // ASSERT
        allure.startStep('Validar quantidade de itens no carrinho');
        await CartPage.assertNumberOfProducts(2);
        allure.endStep();

        allure.startStep('Validar preços, quantidades e totais dos produtos');
        await CartPage.assertLineValues(1, firstProductPrice, 1, firstProductPrice);
        await CartPage.assertLineValues(2, secondProductPrice, 1, secondProductPrice);
        allure.endStep();

        await browser.pause(3000);
    });
});
