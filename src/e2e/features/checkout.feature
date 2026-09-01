# language: pt

Funcionalidade: Fluxo de Autenticação e Checkout E2E

  Contexto:
    Dado que o usuário acessa a página inicial do e-commerce

  Cenário: Realizar compra completa com dados válidos
    Quando insere o usuário "standard_user" e a senha "secret_sauce"
    E clica no botão de login
    Então deve visualizar a lista de produtos
    Quando adiciona o produto "Sauce Labs Backpack" ao carrinho
    E vai para o carrinho e inicia o checkout
    E preenche o formulário com "QA", "Tester" e "86000-000"
    E confirma e finaliza a compra
    Então a mensagem "Thank you for your order!" deve ser exibida

  Cenário: Tentativa de login com senha incorreta
    Quando insere o usuário "standard_user" e a senha "senha_invalida"
    E clica no botão de login
    Então a mensagem de erro "Username and password do not match any user in this service" deve ser exibida

  Cenário: Tentativa de checkout sem informar o primeiro nome
    Quando insere o usuário "standard_user" e a senha "secret_sauce"
    E clica no botão de login
    E adiciona o produto "Sauce Labs Backpack" ao carrinho
    E vai para o carrinho e inicia o checkout
    E preenche o formulário com "", "Tester" e "86000-000"
    E tenta continuar
    Então a mensagem de erro no checkout "Error: First Name is required" deve ser exibida