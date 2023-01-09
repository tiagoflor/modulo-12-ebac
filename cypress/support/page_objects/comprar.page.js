class EnderecoPage {


    comprarProdutoLoja(quantidade) {
       
        
        cy.get('[class="product-block grid"]')
            .contains('Atlas Fitness Tank').click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //usei para validar a quantidade de itens adicionados e o valor total
        cy.get('[class="product-quantity"]')
            .contains('3')
        cy.get('[class="woocommerce-Price-amount amount"]')
            .contains('R$54,00')

      cy.get('.showlogin').click()
        
    }
    
}

export default new EnderecoPage()

