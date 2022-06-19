describe('Increment Number of Items', () => {

    it('Select one button add', () => {
        cy.visit(Cypress.config().baseUrl)


        cy.get("button.btn.btn-secondary").first().click()

        cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','1')

    })

    it('Select same button add', () => {
    
        cy.get("button.btn.btn-secondary").first().click()

        cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','1')

    })

    it('Select different button add', () => {
    
        cy.get("button.btn.btn-secondary").last().click()

        cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','2')

    })

})