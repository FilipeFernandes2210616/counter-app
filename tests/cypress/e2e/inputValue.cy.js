import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('there is no number in value textbox', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('#txtUsername').should('eq','');
})

And('I dont insert number', () => {
    cy.get('#txtUsername').should('eq','');
})

When('I select button added', () => {
    cy.get("button.btn.btn-secondary").first().click()
})


Then('Item count should not increase and warning should appear', () => {
    cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','1')
})