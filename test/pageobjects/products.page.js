const Page = require('./page');

class ProductsPage extends Page {
    // ------ ELEMENTOS BÁSICOS ---------
    get menuProducts() {
        return $('a[href="/products"]');
    }

    get searchInput() {
        return $('#search_product');
    }

    get searchButton() {
        return $('#submit_search');
    }

    //titulo "SEARCHED PRODUCTS"
    get searchedProductsTitle() {
        return $('h2.title.text-center');
    }

    // nome dos produtos retornados na busca
    get productNames() {
        return $$('//div[@class="features_items"]/div//div[@class="productinfo text-center"]/p');
    }

    // TODOS os cards de produto na tela /products
    get productCards() {
        return $$('.features_items .product-image-wrapper');
    }


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

    async addProductToCart(index) {
        const cards = await this.productCards;

        // seguran~ca: garante que o índice existe
        if (!cards[index]) {
            throw new Error(`Nenhum card de produto encontrado no índice ${index}. Total de cards: ${cards.length}`);
        }

        const card = cards[index];

        await card.scrollIntoView();
        await card.moveTo();

        // botão "Add to cart" dentri do card
        const addBtn = await card.$('.product-overlay a.btn.btn-default.add-to-cart');

        await addBtn.waitForDisplayed({ timeout: 10000 });

        await browser.execute((el) => el.click(), addBtn);
    }

    async addProductToCartByIndex(index) {
        await this.addProductToCart(index);
    }

    //link "View Cart" do modal depois de adicionao produto
    get viewCartFromModalButton() {
        return $('//u[.="View Cart"]/parent::a');
    }

    async openCartFromModal() {
        await this.viewCartFromModalButton.waitForClickable({ timeout: 10000 });
        await this.viewCartFromModalButton.click();
    }

    // ------- DETALHE DO PRODUTO (TC13) ----------

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
        //garante que a pagina volte para o topo,
        // evitan q o anuncio embaixo da tela fique por cima do link
        await browser.execute('window.scrollTo(0, 0);');

        const viewLinks = await $$('//a[contains(text(),"View Product")]');
        const link = viewLinks[index - 1];

        //centraliza o link na tela e garante que esteja clicavel
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
