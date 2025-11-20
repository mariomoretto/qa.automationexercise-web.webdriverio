class SignupPage {
    get titleMr()     { return $('#id_gender1'); }
    get titleMrs()    { return $('#id_gender2'); }

    get password()    { return $('#password'); }
    get day()         { return $('#days'); }
    get month()       { return $('#months'); }
    get year()        { return $('#years'); }

    get newsletter()  { return $('#newsletter'); }
    get offers()      { return $('#optin'); }

    get firstName()   { return $('#first_name'); }
    get lastName()    { return $('#last_name'); }
    get company()     { return $('#company'); }
    get address1()    { return $('#address1'); }
    get address2()    { return $('#address2'); }
    get country()     { return $('#country'); }
    get state()       { return $('#state'); }
    get city()        { return $('#city'); }
    get zipcode()     { return $('#zipcode'); }
    get mobile()      { return $('#mobile_number'); }

    get createAccountBtn() { return $('button[data-qa="create-account"]'); }

    async fillForm(user) {
        // Title
        if (user.title === "Mr") {
            await this.titleMr.click();
        } else {
            await this.titleMrs.click();
        }

        //campos basicos
        await this.password.setValue(user.password);
        await this.day.selectByVisibleText('5');
        await this.month.selectByVisibleText('May');
        await this.year.selectByVisibleText('1995');

        //checkboxes
        await this.newsletter.click();
        await this.offers.click();

        //endereco info
        await this.firstName.setValue(user.firstName);
        await this.lastName.setValue(user.lastName);
        await this.company.setValue(user.company);
        await this.address1.setValue(user.address1);
        await this.address2.setValue(user.address2);
        await this.country.selectByVisibleText(user.country);
        await this.state.setValue(user.state);
        await this.city.setValue(user.city);
        await this.zipcode.setValue(user.zipcode);
        await this.mobile.setValue(user.mobile);

        await this.createAccountBtn.click();
    }
}

module.exports = new SignupPage();
