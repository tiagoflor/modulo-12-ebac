/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/comprar.page'
let dadosLogin


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

   //cy.viewport() //dimensionar tamanho da tela da execução do teste para 1280x720 

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('/produtos')
    });

    // Cenário Utilizando Comando customizado
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('[class="product-block grid"]')
            .contains('Atlas Fitness Tank').click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(3)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //usei para validar a quantidade de itens adicionados e o valor total
        cy.get('[class="product-quantity"]')
            .contains('3')
        cy.get('[class="woocommerce-Price-amount amount"]')
            .contains('R$54,00')

        cy.get('.showlogin').click()
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })

    });

    // Cenário Utilizando Page Objects
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - PAGE OBJECT', () => {
        EnderecoPage.comprarProdutoLoja('3')
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-button').click()
        cy.get('#order_comments').type('Local perto do mercado X')
        cy.get('#payment_method_cheque').check() 
        //cy.get('#terms').check()
        cy.get('#terms').click()

    });


})