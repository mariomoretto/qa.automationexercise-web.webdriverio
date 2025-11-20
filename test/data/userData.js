module.exports = {

    // Usuário padrão para cadastro
    userDefault: {
        get email() {
            return `qa_${Date.now()}@gmail.com`;
        },
        name: "Mario QA",
        password: "123456",
        title: "Mr",
        firstName: "Mario",
        lastName: "Moretto",
        company: "QA Corp",
        address1: "Rua Automação 123",
        address2: "Apto 45",
        country: "Canada",
        state: "São Paulo",
        city: "Bauru",
        zipcode: "17000000",
        mobile: "1497842544"
    },

    // Usuário admin
    userAdmin: {
        get email() {
            return `admin_${Date.now()}@gmail.com`;
        },
        name: "Admin Test",
        password: "Adm123",
        title: "Mr",
        firstName: "Admin",
        lastName: "Test",
        company: "Linx Corp",
        address1: "Rua Admin 1",
        address2: "",
        country: "Australia",
        state: "Minas Gerais",
        city: "Poços de Caldas",
        zipcode: "17000001",
        mobile: "14988880000"
    },

    // Usuário com dados inválidos
    userInvalid: {
        email: "email_invalido",
        name: "",
        password: "",
        firstName: "",
        lastName: "",
        mobile: "ABCDEF"
    },

    // Usuário somente leitura (não cadastra)
    userStatic: {
        email: "userstatic@qa.com",
        password: "123456"
    }
};
