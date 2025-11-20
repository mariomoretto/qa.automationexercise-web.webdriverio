const Page = require('./page');

class ProductsPage extends Page {
    // --------- ELEMENTOS BÁSICOS ---------
    get menuProducts() {
        return $('a[href="/products"]');
    }

    get searchInput() {
        return $('#search_product');
    }

    get searchButton() {
        return $('#submit_search');
    }

    // Título "SEARCHED PRODUCTS"
    get searchedProductsTitle() {
        return $('h2.title.text-center');
    }

    // Nome dos produtos retornados na busca
    get productNames() {
        return $$('//div[@class="features_items"]/div//div[@class="productinfo text-center"]/p');
    }

    // TODOS os cards de produto na tela /products
    get productCards() {
        return $$('.features_items .product-image-wrapper');
    }

    // ---------- AÇÕES COMUNS / NAVEGAÇÃO ----------

    async goToProducts() {
        await this.menuProducts.click();
    }

    // BUSCA DE PRODUTO (TC2)
    async searchProduct(term) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        await this.searchInput.setValue(term);
        await this.searchButton.click();
    }

    async assertSearchResults(term) {
        await this.searchedProductsTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.searchedProductsTitle).toHaveTextContaining('SEARCHED PRODUCTS');

        const products = await this.productNames;
        await expect(products).toBeElementsArrayOfSize(3);

        for (const product of products) {
            await expect(product).toBeDisplayed();
            const name = (await product.getText()).toLowerCase();
            expect(name).toContain(term.toLowerCase());
        }
    }

    // ---------- ADD TO CART PELO CARD (TC12 e TC17) ----------

    /**
     * Adiciona um produto ao carrinho pelo índice do card (0-based).
     * - Faz scroll até o card;
     * - Dá hover;
     * - Clica no botão "Add to cart" do overlay daquele card.
     */
    async addProductToCart(index) {
        const cards = await this.productCards;

        // segurança: garante que o índice existe
        if (!cards[index]) {
            throw new Error(`Nenhum card de produto encontrado no índice ${index}. Total de cards: ${cards.length}`);
        }

        const card = cards[index];

        await card.scrollIntoView();
        await card.moveTo();

        // botão "Add to cart" **dentro** do card
        const addBtn = await card.$('.product-overlay a.btn.btn-default.add-to-cart');

        // garante que overlay apareceu
        await addBtn.waitForDisplayed({ timeout: 10000 });

        // às vezes o WebdriverIO encrenca com clickable, então forçamos um clique via JS
        await browser.execute((el) => el.click(), addBtn);
    }

    /**
     * Apenas um alias sem lógica extra, usado no TC17.
     */
    async addProductToCartByIndex(index) {
        await this.addProductToCart(index);
    }

    // Link "View Cart" do modal depois de adicionar produto
    get viewCartFromModalButton() {
        return $('//u[.="View Cart"]/parent::a');
    }

    async openCartFromModal() {
        await this.viewCartFromModalButton.waitForClickable({ timeout: 10000 });
        await this.viewCartFromModalButton.click();
    }

    // ---------- DETALHE DO PRODUTO (TC13) ----------

    get firstProductViewLink() {
        return $('(//a[contains(text(),"View Product")])[1]');
    }

    get quantityInput() {
        return $('#quantity');
    }

    async setProductQuantity(qty) {
        await this.quantityInput.waitForDisplayed({ timeout: 10000 });
        await this.quantityInput.clearValue();
        await this.quantityInput.setValue(String(qty));
    }

    async setDetailQuantity(qty) {
        await this.setProductQuantity(qty);
    }

    get addToCartDetailButton() {
        return $('button.cart');
    }

    async openProductDetailByIndex(index) {
        // Garante que a página volte para o topo,
        // evitando que o anúncio embaixo da tela fique por cima do link
        await browser.execute('window.scrollTo(0, 0);');

        const viewLinks = await $$('//a[contains(text(),"View Product")]');
        const link = viewLinks[index - 1];

        // Centraliza o link na tela e garante que esteja clicável
        await link.scrollIntoView({ block: 'center', inline: 'center' });
        await link.waitForClickable({ timeout: 10000 });

        await link.click();
    }

    async addDetailProductToCart() {
        await this.addToCartDetailButton.waitForClickable({ timeout: 10000 });
        await this.addToCartDetailButton.click();
    }

    async goToCartFromModal() {
        await this.viewCartFromModalButton.waitForClickable({ timeout: 10000 });
        await this.viewCartFromModalButton.click();
    }
}

module.exports = new ProductsPage();
