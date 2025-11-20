exports.config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.HEADLESS === 'false'
                ? ['--window-size=1920,1080'] // MODO VISÍVEL
                : ['--headless=new', '--disable-gpu', '--window-size=1920,1080'] // PADRÃO HEADLESS
        }
    }],

    logLevel: 'info',
    baseUrl: 'https://automationexercise.com',
    waitforTimeout: 10000,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000   // ⬅ 60 segundos para cada teste
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },

    suites: {
        smoke: [
            './test/specs/registerUser.e2e.js',
            './test/specs/searchProduct.e2e.js'
        ],
        regression: [
            './test/specs/**/*.js'
        ]
    },
}
