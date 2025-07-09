// cypress/e2e/saucedemo.cy.js
// Comprehensive test suite covering major user flows

describe('Sauce Demo Comprehensive Test Suite', () => {
    beforeEach(() => {
      // Visit login page before each test
      cy.visit('/');
    });
  
    it('Displays error for locked out user', () => {
      cy.login('locked_out_user', 'secret_sauce');
      cy.get('[data-test="error"]').should(
        'contain.text',
        'Sorry, this user has been locked out.'
      );
    });
  
    it('Logs in successfully with valid credentials', () => {
      cy.login('standard_user', 'secret_sauce');
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('have.text', 'Products');
    });
  
    it.only('Adds and removes items from cart', () => {
      cy.login('standard_user', 'secret_sauce');
      // Add first item
      cy.get('.inventory_item').first().within(() => {
        cy.get('button').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
      });
      cy.get('.shopping_cart_badge').should('contain.text', '1');
      // Remove it
      cy.get('.inventory_item').first().within(() => {
        cy.get('button').click().should('have.text', 'Add to cart');
      });
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  
    it('Completes checkout process end-to-end', () => {
      cy.login('standard_user', 'secret_sauce');
      // Add two specific items
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      // Remove one item and verify
      cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
      cy.get('.cart_item').should('have.length', 1);
  
      // Proceed to checkout
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
  
      // Review order and finish
      cy.get('.cart_item').should('have.length', 1);
      cy.get('[data-test="finish"]').click();




   
      cy.get('.complete-header').should(
        'contain.text',
        'THANK YOU FOR YOUR ORDER'
      );
    });
  
    it('Logs out successfully', () => {
      cy.login('standard_user', 'secret_sauce');
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('[data-test="login-button"]').should('be.visible');
    });
  });
// This test suite covers the main user flows of the Sauce Demo application,
// including login, adding/removing items from the cart, completing the checkout process,