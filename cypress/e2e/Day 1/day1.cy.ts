import 'cypress-xpath'

describe('template spec', () => {
  xit('passes', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })


  it('Writ some automation on way2automation side',()=>{

cy.visit('https://www.way2automation.com/angularjs-protractor/registeration/#/login')
cy.xpath("//input[@id='username']").type('angular')
cy.xpath("//input[@id='password']").type('password')
cy.xpath('//input[@id="formly_1_input_username_0"]').type('Georgek')
cy.xpath("//button[normalize-space()='Login']").click()
cy.xpath("//h1[normalize-space()='Home']").should('be.visible')


  })
})