describe('Success', () => {
  it('Authentification successful', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user'),
      cy.get('[data-test="password"]').type('secret_sauce'),
      cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('John')
    cy.get('[data-test="postalCode"]').type('33000')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.screenshot()
  });
});
describe('add product', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user'),
      cy.get('[data-test="password"]').type('secret_sauce'),
      cy.get('[data-test="login-button"]').click()
  })
  it('adding product', () => {
    cy.get('.shopping_cart_badge').invoke('text')
      .then((text) => {
        const currentCount = parseInt(text) || 0
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('be.visible')
        cy.get('.shopping_cart_badge')
          .then((text) => {
            const newCount = parseInt(text)
            expect(newCount).to.be.greaterThan(currentCount)
            cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
          })
      })
  })

  describe('Add / remove product to cart on saucedemo', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user'),
        cy.get('[data-test="password"]').type('secret_sauce'),
        cy.get('[data-test="login-button"]').click()
  })
    it('adding one product', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      cy.get('.shopping_cart_badge')
        .invoke('text')
        .then(text => {
          const currentCount = parseInt(text) || 0
          cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
          cy.get('.shopping_cart_badge').should('be.visible')
          cy.get('.shopping_cart_badge')
            .invoke('text')
            .then(text => {
              const newCount = parseInt(text) || 0
              expect(newCount).to.equal(currentCount + 1)
              cy.get('[data-test="remove-sauce-labs-backpack"]').should(
              'be.visible'
              )
            })
        })
    })
    it('removing one product', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_badge')
        .invoke('text')
        .then(text => {
          const currentCount = parseInt(text) || 0
          cy.get('[data-test="remove-sauce-labs-backpack"]').click()
          cy.get('.shopping_cart_badge').should('be.visible')
          cy.get('.shopping_cart_badge')
            .invoke('text')
            .then(text => {
              const newCount = parseInt(text) || 0
              expect(newCount).to.equal(currentCount-1)
              cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
              'be.visible'
              )
            })
        })
    })
  })

});

