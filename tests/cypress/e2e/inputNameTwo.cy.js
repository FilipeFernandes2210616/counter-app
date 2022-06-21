import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('There is text in name textbox', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('#txtUsername').should('eq','');
})

And('Item is already counted in shopping cart', () => {
    cy.get('#txtUsername').should('eq','');
})

When('I try change name of item', () => {
    cy.get("button.btn.btn-secondary").first().click()
})


Then('Name should not change', () => {
    cy.get("span.badge.badge-pill.badge-info.m-2").should('have.text','1')
})