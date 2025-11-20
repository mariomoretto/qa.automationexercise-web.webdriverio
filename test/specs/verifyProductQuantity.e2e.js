const HomePage     = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage     = require('../pageobjects/cart.page');
const allure      = require('@wdio/allure-reporter').default;

describe('Test Case 13 - Verify Product quantity in Cart', () => {
    it('Deve adicionar produto com quantidade 4 e validar no carrinho', async () => {
        allure.addSeverity('critical');
        allure.addFeature('Carrinho');
        allure.addStory('Alterar quantidade do produto antes de adicionar ao carrinho');

        // ARRANGE
        const desiredQty = 4;

        // ACT 1 - Home> Products
        allure.startStep('Abrir página inicial e acessar tela de produtos');
        await HomePage.open();
        await ProductsPage.goToProducts();
        allure.endStep();

        // ACT 2 - abre detalhe do produto e alterar quantidade
        allure.startStep('Abrir detalhe do produto e definir quantidade');
        await ProductsPage.openProductDetailByIndex(1);     // View Product do 1º item
        await ProductsPage.setProductQuantity(desiredQty);  // altera para 4
        allure.endStep();

        // ACT 3 - adiciona ao carrinho e vai  para o Cart
        allure.startStep('Adicionar produto ao carrinho e acessar tela do carrinho');
        await ProductsPage.addDetailProductToCart();        // botão Add to cart
        await ProductsPage.goToCartFromModal();             // botão "View Cart" no modal
        allure.endStep();

        // ASSERT
        allure.startStep('Validar quantidade e valores do produto no carrinho');
        await CartPage.assertNumberOfProducts(1);
        await CartPage.assertProductQuantity(1, desiredQty);
        await CartPage.assertLineValues(1, 500, desiredQty, 500 * desiredQty);
        allure.endStep();

        await browser.pause(3000);
    });
});
