const HomePage     = require('../pageobjects/home.page');
const ProductsPage = require('../pageobjects/products.page');
const allure      = require('@wdio/allure-reporter').default;

describe('Test Case 2 - Search Product', () => {
    it('Deve buscar produto e validar resultados', async () => {
        allure.addSeverity('normal');
        allure.addFeature('Busca de produtos');
        allure.addStory('Buscar produtos pelo termo jeans');

        // ARRANGE
        const searchTerm = 'jeans';

        // ACT 1 - Home -> Products
        allure.startStep('Abrir página inicial e acessar tela de produtos');
        await HomePage.open();
        await ProductsPage.goToProducts();
        allure.endStep();

        // ACT 2 - Efetuar busca
        allure.startStep(`Pesquisar produtos pelo termo "${searchTerm}"`);
        await ProductsPage.searchProduct(searchTerm);
        allure.endStep();

        // ASSERT
        allure.startStep('Validar resultados da busca');
        await ProductsPage.assertSearchResults(searchTerm);
        allure.endStep();

        await browser.pause(3000);
    });
});
