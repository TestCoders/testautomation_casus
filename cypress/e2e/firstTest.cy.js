/// <reference types="cypress" />

beforeEach(() => {
    // have cypress visit the baseurl before each test
    cy.visit('/')
})

describe('different ways to select locators: ', () => {

    it('easy locators', () => {

        // by Tag name
        cy.get('section')
        cy.get('header')

        // by ID
        cy.get('#header_signUp')

        // by Class name
        cy.get('.header__logo')

        // by Class value
        // uses entire value including spaces
        cy.get('[class="header__logo"]')

        // by Attribute name
        cy.get('[placeholder]')
    })


    it('more complex locators', () => {

        // by Attribute name and value
        cy.get('[placeholder="placeholder_header"]')

        // by tag name and Class with value
        cy.get('header[placeholder="placeholder_header"]')

        // by two different attributes
        cy.get('[href="/login"][class]')

        // by two different attributes
        cy.get('[placeholder="placeholder_header"][fullwidth]')

        // by tagname, Attribute with value, and Class name
        cy.get('header[placeholder="placeholder_header"].header')

        // by tagname, Attribute with value, ID and Class name
        cy.get('header[placeholder="placeholder_header"]#id_header.header')
    })

    it('the recommended way by Cypress', () => {
        // cypress recommended
        // use attributes added by yourself
        cy.get('#header_signUp')
        cy.get('#header_login')

    })

})

describe('finding web Elements', () => {
    it('using a parent class to find a tag', () => {

        cy.get('#header_signUp')
            .parents('header')
            .find('.header__title')
            .should('contain', 'Movies')

        cy.get('#header_signUp').click()

        cy.get('#header_signUp')
            .parents('header')
            .find('.header__title')
            .should('contain', 'Sign Up')
    })

})

describe('then and wrap methods', () => {
    it.only('how to use', () => {


        cy.get('#header_signUp').click()

        cy.get('#header_signUp')
            .should('contain', 'Sign Up')
         
            cy.contains ('section', 'Sign Up').find('[for="username"]').should('contain', 'Username')
            cy.contains ('section', 'Sign Up').find('[for="password"]').should('contain', 'Password')
            cy.contains ('section', 'Sign Up').find('[for="repeat-password"]').should('contain', 'Repeat')
    })

})
