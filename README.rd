# Automação Outsera - QA Automation Hub

Framework integrado de automação de testes cobrindo testes de **API RESTful**, **E2E Web (Playwright + Cucumber BDD / POM)** e **Performance / Carga (K6)**, com pipeline de integração contínua (CI/CD) via **GitHub Actions** e publicação automática de dashboard com **histórico permanente** no **GitHub Pages**.

---

## 🛠️ Tecnologias e Versões

* **Linguagem & Runtime:** TypeScript (v5.x) & Node.js (v20+ LTS / v24)
* **Testes de API:** Playwright Test (v1.42+)
* **Engine & Framework E2E:** Playwright + Cucumber.js (v10.x)
* **Padrão Arquitetural E2E:** Page Object Model (POM) com BDD (Gherkin)
* **Performance e Carga:** Grafana K6 (v0.49+)
* **Servidor Mock:** ServeRest
* **Relatórios:** Playwright HTML Report, Cucumber Official HTML Reporter e K6 HTML Reporter
* **CI/CD & Deploy:** GitHub Actions + GitHub Pages + Job Step Summary

---

## 📁 Estrutura de Pastas

.github/
└── workflows/
    └── test-pipeline.yml
src/
├── api/
│   └── clients/
│       └── userClient.ts
├── e2e/
│   ├── features/
│   │   └── checkout.feature
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   └── CheckoutPage.ts
│   ├── steps/
│   │   └── checkoutSteps.ts
│   └── support/
│       └── hooks.ts
└── performance/
    └── load-test.js
tests/
└── api/
    └── users.spec.ts
cucumber.js
playwright.config.ts
tsconfig.json
package.json
README.md

---

## 💻 1. Execução Manual Local (Na Máquina)

### Pré-requisitos do Sistema
* Node.js v20.x ou superior instalado
* Git instalado
* K6 instalado:
  - Windows (PowerShell): winget install k6 --source winget
  - Linux (Ubuntu/Debian): sudo apt-get install k6
  - macOS: brew install k6

### Instalação das Dependências
Na raiz do projeto, execute:

Opção A - Com o repositório clonado (Recomendado):
npm install
npx playwright install --with-deps chromium

Opção B - Instalação explícita de pacotes:
npm init -y
npm install -D typescript tsx @types/node
npm install -D @playwright/test @cucumber/cucumber
npx playwright install --with-deps chromium

---

### Comandos de Execução Local

#### A. Toda a Suíte (Unificada)
Executa API, E2E e Performance em sequência:
npm run test:all

#### B. Testes de API (Playwright)
Executar testes:
npm run test:api

Abrir relatório HTML:
npm run test:api:report

#### C. Testes E2E (Playwright + Cucumber BDD / POM)
Executar testes:
npm run test:e2e

Abrir relatório HTML E2E no navegador:
- Windows (PowerShell): Start-Process reports/cucumber-report.html
- macOS: open reports/cucumber-report.html
- Linux: xdg-open reports/cucumber-report.html

Nota: Screenshots automáticos de falhas são gravados em reports/screenshots/.

#### D. Testes de Carga (K6)
Passo 1 - Iniciar o mock server em um terminal separado:
npx serverest@latest

Passo 2 - No terminal principal, executar o teste de carga:
npm run test:perf

Abrir relatório de performance no navegador:
- Windows (PowerShell): Start-Process load-test-report.html
- macOS / Linux: open load-test-report.html ou xdg-open load-test-report.html

---

## ☁️ 2. Execução Automática e Remota (GitHub Actions & Pages)

O pipeline em .github/workflows/test-pipeline.yml gerencia a execução em nuvem, versionamento histórico de relatórios e deploy contínuo.

### Formas de Disparo da Pipeline
1. Automático: A cada push ou abertura de pull_request nas branches main e master.
2. Manual (Workflow Dispatch):
   - Vá até a aba Actions no repositório no GitHub.
   - Selecione o workflow QA Automation Pipeline no menu à esquerda.
   - Clique no menu suspenso Run workflow -> selecione a branch main -> clique no botão verde Run workflow.

---

### Acompanhamento e Visualização de Resultados no GitHub

#### A. Dashboard Web Unificado com Histórico Permanente (GitHub Pages)
O link oficial do painel é: https://ivanschuindtribeiro.github.io/Outsera/

* Configuração Única de Deploy:
  1. Acesse Settings > Pages no seu repositório.
  2. Em Build and deployment > Source, selecione Deploy from a branch.
  3. Em Branch, escolha gh-pages e a pasta /(root), depois clique em Save.

* Estrutura do Dashboard:
  - 🚀 Última Execução (Latest): Acesso rápido aos relatórios da build mais recente:
    * 📡 API Contract & Integration: Playwright REST Test Suite.
    * 🎭 E2E Web Cucumber: Playwright BDD Scenario Execution.
    * ⚡ K6 Performance: Load & Thresholds Metrics.
  - 📜 Histórico de Execuções Permanentes: Tabela com todas as builds anteriores (#1, #2, #3...), data/hora UTC, commit SHA e links individuais salvos permanentemente (runs/<numero_da_build>/).

#### B. Resumo da Execução (Job Summary)
Ao final da execução na aba Actions, a tela de resumo exibe:
* Link direto para o Dashboard no GitHub Pages.
* Tabela com o status detalhado (✅ Sucesso / ❌ Falha) de cada camada testada.

#### C. Download de Artefatos ZIP
No rodapé de cada execução na aba Actions, os relatórios completos permanecem disponíveis para download por até 7 dias na seção Artifacts:
* playwright-api-report.zip
* cucumber-e2e-report.zip
* k6-load-report.zip
