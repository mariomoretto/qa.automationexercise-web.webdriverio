class Page {
    open (path = '/') {
        return browser.url(`https://automationexercise.com${path}`);
    }
}

module.exports = Page;
