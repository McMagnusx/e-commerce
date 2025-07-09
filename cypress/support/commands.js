// cypress/support/commands.js
// Custom commands for reusable actions
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').clear().type(username);
    cy.get('[data-test="password"]').clear().type(password, { log: false });
    cy.get('[data-test="login-button"]').click();
  });