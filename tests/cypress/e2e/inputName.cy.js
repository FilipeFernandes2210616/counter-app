import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('Given there is no text in name textbox', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('#txtUsername').should('eq','');
})

And('And user didnt insert name', () => {
    cy.get('#txtUsername').should('eq','');
})

When('When I select button added', () => {
    cy.get("button.btn.btn-secondary").first().click()
})


Then('Then item count should not increase', () => {
    cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','1')
})