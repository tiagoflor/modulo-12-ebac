const { faker } = require('@faker-js/faker');

class CadastroPage {

cadastroUsuario() {
     cy.get('#reg_email').type(faker.internet.email()) 
     cy.get('#reg_password').type('!teste@teste2',{ log: false })
     cy.get(':nth-child(4) > .button').click()

     cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
     cy.get('#account_first_name').type(faker.name.firstName()) // chamando a metodo faker para criar nome
     cy.get('#account_last_name').type(faker.name.lastName()) // chamando a metodo faker para criar ultimo nome
     cy.get('.woocommerce-Button').click()
     }
     
}

export default new CadastroPage()

