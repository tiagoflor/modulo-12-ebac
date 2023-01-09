/// <reference types="cypress" />
let dadosLogin
const { faker } = require('@faker-js/faker');
const { default: cadastroPage } = require('../support/page_objects/cadastro.page');
import CadastroPage from '../support/page_objects/cadastro.page'



context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

   // afterEach(() => {
     //   cy.screenshot()
    //});

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it.only('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, Jenkins')
    })

    // Utilizando Page Object
    it('Criação de usuário utilizando Faker', () => {
        CadastroPage.cadastroUsuario()
        cy.get('.woocommerce-message').contains('Detalhes da conta modificados com sucesso.')
    });

    
})