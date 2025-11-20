class HomePage {
    get signupLoginBtn() { 
        return $('a[href="/login"]'); 
    }

    async open() {
        await browser.url('https://automationexercise.com');
    }

    async clickSignupLogin() {
        await this.signupLoginBtn.click();
    }
     //método para abrir um produto
     get firstViewProductBtn() {
        return $('(//a[contains(text(),"View Product")])[1]');
    }

    async viewFirstProduct() {
        await this.firstViewProductBtn.scrollIntoView();
        await this.firstViewProductBtn.click();
    }
}

module.exports = new HomePage();
