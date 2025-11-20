# Projeto de Testes Automatizados – Automation Exercise Web

## Tecnologias Utilizadas
- Node.js
- WebdriverIO
- Mocha
- Allure Reports
- GitHub Actions
- Padrão Page Object

## Pré-requisitos
- Node.js instalado (>= 18)
- Java instalado (para Allure CLI)
- Navegador Google Chrome

## 📥 Instalação
**Clonar o repositório**
```bash
git clone https://github.com/mariomoretto/qa.automationexercise-web.webdriverio.git
```
**Acessar a pasta do projeto**
```bash
cd qa.automationexercise-web.webdriverio
```
**Instalar dependências**
```bash
npm install
```

## 🚀 Execução dos Testes
**1. Execução padrão (headless)**
Roda todos os testes em modo headless (sem abrir a janela do navegador):
```bash
npm test
```

**2. Execução em modo visual (headed)**
Abre o Chrome na tela para acompanhar a execução:
```bash
npm run test:headed
```

**3. Rodar em modo headless explicitamente**
```bash
npm run test:headless
```

**4. Executar suítes específicas (Smoke / Regression)**
As suítes estão configuradas no wdio.conf.js.
Exemplos de execução por suite:

- **Suite Smoke**
```bash
npx wdio run wdio.conf.js --suite smoke
```

- **Suite Regression**
```bash
npx wdio run wdio.conf.js --suite regression
```

## 📊 Relatórios Allure
Gerar o relatório
```bash
npm run allure:generate
```

Abrir o relatório no navegador
```bash
npm run allure:open
```

Por padrão, os arquivos são gerados em ./allure-report.
A cada execução na pipeline do GitHub Actions, os resultados são enviados como artefatos para download.

## 🧱 Padrões de Projeto e Boas Práticas

- **Page Object Model (POM)**
Todos os elementos e ações de tela são encapsulados em classes dentro de test/pageobjects, evitando duplicação de código.

- **Triple A (Arrange, Act, Assert)**
Todos os testes seguem a estrutura:

    Arrange: preparação de massa/dados e estado da tela

    Act: execução das ações do usuário

    Assert: validação dos resultados esperados

- **Código organizado e escalável**

    Separação clara entre page objects, specs, dados e configuração

    Nomes de métodos e arquivos descritivos

    Mapeamento de elementos centralizado nas páginas

- **Execução em modo headless**

    Ideal para CI, com foco em performance de execução

## ☁️ Integração Contínua (GitHub Actions)

O workflow está definido em .github/workflows/ci.yml e contempla:

    - Execução automática dos testes em push e pull request na branch main

    - Instalação de dependências

    - Execução dos testes via npm run test:ci

    - Publicação dos resultados Allure como artefato de build

Isso garante feedback rápido sobre a qualidade das alterações e facilita o acompanhamento da saúde do projeto.

## ✅ Cobertura de Testes Implementados

- **TC01 – Registrar Usuário**
Cria um novo usuário, valida o cadastro e remove a conta ao final.

- **TC02 – Buscar Produto**
Valida a busca por produtos e o retorno de itens relacionados ao termo pesquisado.

- **TC12 – Adicionar Produtos no Carrinho**
Adiciona dois produtos distintos ao carrinho e valida quantidade total de itens.

- **TC13 – Verificar Quantidade no Carrinho**
Define quantidade específica na tela de detalhes do produto (ex.: 4 unidades) e confirma o valor na página do carrinho.

- **TC17 – Remover Produtos do Carrinho**
Remove um produto do carrinho e valida a mensagem “Cart is empty!”.
