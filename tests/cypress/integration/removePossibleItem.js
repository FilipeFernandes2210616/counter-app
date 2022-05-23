describe('Remove Possible Items', () => { 

    let count = 0

    it('Remove possible item', () => {
        cy.visit(Cypress.config().baseUrl)
        
        cy.get("button.btn.btn-danger").each(() => {
            count++
            console.log(count)
        }).then(() => {
            
            cy.get("button.btn.btn-danger").should('have.length', count);

            cy.get("button.btn.btn-danger").first().click()

            cy.get("button.btn.btn-danger").should('have.length', count-1)
        })

    })

    //it() novo cenário - verificar se tem um botão com texto "One"

    //it() novo cenário - remove all e tentar clicar no primeiro remove da lista

 })