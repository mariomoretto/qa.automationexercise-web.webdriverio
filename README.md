# Projeto de Automação - Automation Exercise (WebdriverIO)

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

## Instalação
git clone <url-do-repo>
cd wdio_project
npm install

## Como Executar os Testes [Execução local (headless)]
npm test

## Modo com navegador abrindo na tela
npm run test:headed

## Executar uma suíte específica
npx wdio run wdio.conf.js --suite smoke

## Relatórios Allure
Gerar relatório
npm run allure:generate

## Abrir relatório
npm run allure:open
```bash


