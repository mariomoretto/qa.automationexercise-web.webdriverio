class CartPage {
    get cartRows() {
        return $$('#cart_info_table tbody tr');
    }

    get firstProductQuantity() {
        return $('//td[@class="cart_quantity"]/button');
    }

    async open() {
        await browser.url('https://automationexercise.com/view_cart');
    }

    async assertNumberOfProducts(expected) {
        if (expected > 0) {
            const firstRow = $('#cart_info_table tbody tr');
            await firstRow.waitForExist({ timeout: 10000 });
        }

        const rows = await this.cartRows;
        await expect(rows).toBeElementsArrayOfSize(expected);
    }

    async assertProductQuantity(index, expectedQty) {
        const rows = await this.cartRows;
        const row = rows[index - 1];          // index 1-based

        const qtyButton = await row.$('.cart_quantity button');
        const qtyText = await qtyButton.getText();

        const qty = parseInt(qtyText.trim(), 10);
        expect(qty).toBe(expectedQty);
    }

    //-- remover produto (X) ---
    get deleteFirstProductIcon() {
        return $('a.cart_quantity_delete');
    }

    async removeFirstProduct() {
        await this.deleteFirstProductIcon.waitForClickable({ timeout: 10000 });
        await this.deleteFirstProductIcon.click();
    }
    get deleteButtons() {
        return $$('a.cart_quantity_delete');
    }

    async removeProductByIndex(index) {
        const btn = this.deleteButtons[index];  // chama com 0,1,2...
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
    }

    // --- mensagem "Cart is empty!" 
    get emptyCartContainer() {
        return $('#empty_cart');
    }

    get emptyCartText() {
        return $('#empty_cart p.text-center');
    }

    async assertCartEmpty() {
        await this.emptyCartContainer.waitForDisplayed({ timeout: 10000 });
        await expect(this.emptyCartText).toHaveTextContaining('Cart is empty!');
    }

    async getRow(index) {
        const rows = await this.cartRows;
        return rows[index - 1]; 
    }

    async assertLineValues(index, expectedPrice, expectedQty, expectedTotal) {
        const row = await this.getRow(index);

        const priceText = await row.$('.cart_price p').getText();   
        const qtyText   = await row.$('.cart_quantity button').getText(); 
        const totalText = await row.$('.cart_total .cart_total_price').getText(); 

        const price = parseInt(priceText.replace(/\D/g, ''), 10);
        const qty   = parseInt(qtyText.trim(), 10);
        const total = parseInt(totalText.replace(/\D/g, ''), 10);

        expect(price).toBe(expectedPrice);
        expect(qty).toBe(expectedQty);
        expect(total).toBe(expectedTotal);
    }
}

module.exports = new CartPage();
