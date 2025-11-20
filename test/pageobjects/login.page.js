class LoginPage {
    get nameInput()  { return $('input[data-qa="signup-name"]'); }
    get emailInput() { return $('input[data-qa="signup-email"]'); }
    get signupBtn()  { return $('button[data-qa="signup-button"]'); }

    async signup(name, email) {
        await this.nameInput.setValue(name);
        await this.emailInput.setValue(email);
        await this.signupBtn.click();
    }
}

module.exports = new LoginPage();
