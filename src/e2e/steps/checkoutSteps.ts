import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;

Given('que o usuário acessa a página inicial do e-commerce', async () => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  checkoutPage = new CheckoutPage(page);
  await loginPage.navigate();
});

When('insere o usuário {string} e a senha {string}', async (user: string, pass: string) => {
  await loginPage.login(user, pass);
});

When('clica no botão de login', async () => {
  // Já executado no método login
});

Then('deve visualizar a lista de produtos', async () => {
  await productsPage.assertLoaded();
});

When('adiciona o produto {string} ao carrinho', async (productName: string) => {
  await productsPage.addProductToCart(productName);
});

When('vai para o carrinho e inicia o checkout', async () => {
  await productsPage.openCart();
  await checkoutPage.proceedToCheckout();
});

When('preenche o formulário com {string}, {string} e {string}', async (first: string, last: string, zip: string) => {
  await checkoutPage.fillForm(first, last, zip);
});

When('confirma e finaliza a compra', async () => {
  await checkoutPage.continue();
  await checkoutPage.finish();
});

Then('a mensagem {string} deve ser exibida', async (msg: string) => {
  await checkoutPage.assertOrderComplete(msg);
});

Then('a mensagem de erro {string} deve ser exibida', async (msg: string) => {
  await loginPage.assertErrorMessage(msg);
});

When('tenta continuar', async () => {
  await checkoutPage.continue();
});

Then('a mensagem de erro no checkout {string} deve ser exibida', async (msg: string) => {
  await checkoutPage.assertErrorMessage(msg);
});