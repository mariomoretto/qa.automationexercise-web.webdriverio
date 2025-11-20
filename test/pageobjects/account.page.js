class AccountPage {
    get continueBtn() { return $('a[data-qa="continue-button"]'); }
    get deleteBtn()   { return $('a[href="/delete_account"]'); }
    get deletedMsg()  { return $('h2[data-qa="account-deleted"]'); }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async deleteAccount() {
        await this.deleteBtn.click();
    }

    async assertAccountDeleted() {
        await expect(this.deletedMsg).toBeDisplayed();
    }
}

module.exports = new AccountPage();
