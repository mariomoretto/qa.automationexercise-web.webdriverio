class ProductDetailsPage {
    get quantityInput() {
        return $('#quantity');
    }

    get addToCartButton() {
        return $('//button[contains(@class,"cart")]');
    }

    get modalViewCartLink() {
        return $('//a[@href="/view_cart"]');
    }

    async setQuantity(qty) {
        await this.quantityInput.waitForDisplayed();
        await this.quantityInput.clearValue();
        await this.quantityInput.setValue(qty.toString());
    }

    async addToCart() {
        await this.addToCartButton.waitForClickable();
        await this.addToCartButton.click();
    }

    async goToCartFromModal() {
        await this.modalViewCartLink.waitForClickable();
        await this.modalViewCartLink.click();
    }
}

module.exports = new ProductDetailsPage();
