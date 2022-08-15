/// <reference types="cypress" />


beforeEach(() => {
    // have cypress visit the baseurl before each test
    cy.visit('/')
})

describe('cypress demo: User is not logged in', () => {

    // test skipped for presentation purposes
    it.skip('Visit all movies page, while not logged in', () => {

        //check out all the movies
        cy.visit('/movies')
        cy.get('.header__title')
            .contains('All Movies')

        // verify movie 'Wild Wild West' is present
        // verify 'More info' button is not present, this is a feature when logged in    
        cy.get('.movies')
            .find('.movie__details')
            .contains('Wild Wild West')
            .should('contain', 'Wild West')
            .find('button')
            .should('not.exist')
    })

    it('try to log in without an account', () => {

        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to login page and log in
        loginOnImtdb(id)

        // verify Login Failed
        cy.get('h2')
            .should('contain', 'Login Failed')
            // wait for management to approve
            .wait(500)
    })
})


describe('cypress demo: User Creates account', () => {

    // test is supposed to fail
    it('Create account, then create a new account with same username', () => {
        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to sign up and create user
        createUser(id)
        verifyUserCreated(id)

        // go to sign up and create (same) user
        createUser(id)

        // Verify Logging in has failed
        cy.get('header')
            .contains('Login Failed')
            .should('contain', 'Login Failed')

        // verify actual result vs expected result   (test will fail)
        cy.get('section')
            .contains('Login Failed')
            // actual result on page
            .should('contain', 'Login Failed')
            // expected result on page
            .should('contain', 'Failed to create user')
            // wait for management to approve
            .wait(500)
    })


    it('Create account, then Login and visit profile page', () => {
        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to sign up and create user
        createUser(id)
        verifyUserCreated(id)

        // go to login page and log in
        loginOnImtdb(id)
        verifyLoginSuccesful()

        // visit profile page
        cy.contains('Profile')
            .click()
            // wait for management to approve
            .wait(500)

        // verify users profile is displayed 
        cy.get('h2').contains(`username${id}`)
            .should('contain', `Profile settings of:`)
            .should('contain', `username${id}`)
        cy.get('dd')
            .contains(`username${id}`)
            .should('contain', `username${id}`)
            // wait for management to approve
            .wait(500)


        // log out for good measure
        logOutForGoodMeasure()
    })

    // test skipped for presentation purposes
    it.skip('Create account, Login and then attempt to return to sign up page', () => {
        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to sign up and create user
        createUser(id)
        verifyUserCreated(id)

        // go to login page and log in
        loginOnImtdb(id)
        verifyLoginSuccesful()

        // return to sign up page after being logged in
        // should redirect to movies instead   
        cy.visit('/signup')
        cy.get('.header__title')
            .should('not.contain', 'Sign Up')

            // Verify page redirected to All Movies   
            .contains('All Movies')
            .should('contain', 'All Movies')
            // wait for management to approve
            .wait(500)

        // log out for good measure
        logOutForGoodMeasure()
    })
})


describe('cypress demo: User browses movies', () => {

    it.only('Log in, then scroll through all movies', () => {
        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to sign up and create user
        createUser(id)
        verifyUserCreated(id)

        // go to login page and log in
        loginOnImtdb(id)
        verifyLoginSuccesful()

        //check out all the movies
        cy.get('.header__title')
            .contains('All Movies')
            .should('contain', 'All Movies')

        // Verify Wild West is visible on page
        // Verify button (more info) exists on page (button only exists when logged in )
        cy.get('#movie__title')
            .parents('ul')
            .contains('Wild West')
            .scrollIntoView()
            // wait for management to approve
            .wait(500)
            .should('contain', 'Wild Wild West')
            // using parent in dom to find button 
            .parent('div')
            .find('button')
            .should('exist')




        // checking all movies are visible
        // first test fails, image size is too small
        cy.get('.movie__details')
            .contains('Once Upon a Time in the West')
            .scrollIntoView()
            .siblings()
            .contains('an epic Spaghetti Western film from 1968, starring: nobody you know')
// This part of the test fails
            .get('img[src="https://m.media-amazon.com/images/M/MV5BZGI5MjBmYzYtMzJhZi00NGI1LTk3MzItYjBjMzcxM2U3MDdiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,658,1000_AL_.jpg"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
            // wait for management to approve
            .wait(500)

        // checking if image is visible on second movie    
        cy.get('.movie__details')
            .contains('A Million Ways to Die in the West')
            .scrollIntoView()
            .siblings()
            .contains('A real dollar?!')
            .get('img[src="https://m.media-amazon.com/images/M/MV5BMTQ0NDcyNjg0MV5BMl5BanBnXkFtZTgwMzk4NTA4MTE@._V1_SY1000_CR0,0,631,1000_AL_.jpg"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Wild Wild West')
            .scrollIntoView()
            .siblings()
            .contains('Turned down the matrix for this')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('West Side Story')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Slow West')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('An American Tail: Fievel Goes West')
            .scrollIntoView()
            .siblings()
            .contains('Nostalgia and Childhood memories')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Red Rock West')
            .scrollIntoView()
            .siblings()
            .contains('Nicolas cage playing Michael Williams pretending to be Hitman Lyle from Dallas')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('How the West Was Won')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Journey to the West')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('West of Memphis')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode IV - A New Hope')
            .scrollIntoView()
            .siblings()
            .contains('The one were Obi-Wan is Old Ben')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode V - The Empire Strikes Back')
            .scrollIntoView()
            .siblings()
            .contains('The one were they ignore the snow warning')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode VI - Return of the Jedi')
            .scrollIntoView()
            .siblings()
            .contains('The one with Luke\'s father')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode I - The Phantom Menace')
            .scrollIntoView()
            .siblings()
            .contains('The one everyone saw in theater')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode III - Revenge of the Sith')
            .scrollIntoView()
            .siblings()
            .contains('The one with Obi-Wan\'s brother')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Trek')
            .scrollIntoView()
            .siblings()
            .contains('May the Spock be with you')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Wars: Episode II - Attack of the Clones')
            .scrollIntoView()
            .siblings()
            .contains('The one where Obi-Wan fights a Robot with four lightsabers')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Trek Into Darkness')
            .scrollIntoView()
            .siblings()
            .contains('Benedict CumberKhan')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Trek: First Contact')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Star Trek II: The Wrath of Khan')
            .scrollIntoView()
            .siblings()
            .contains('KHAAAAAANNNNNNNNN')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Love Actually')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Shakespeare in Love')
            .scrollIntoView()
            .siblings()
            .contains('Oscar stealer')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('I Love You, Man')
            .scrollIntoView()
            .siblings()
            .contains('Paul Rudd plays Paul Rudd, again')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('P.S. I Love You')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)


        cy.get('.movie__details')
            .contains('Love & Other Drugs')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Punch-Drunk Love')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('From Paris with Love')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('From Russia with Love')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('I Love You Phillip Morris')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('2001: A Space Odyssey')
            .scrollIntoView()
            .siblings()
            .contains('I know I\'ve made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal. I\'ve still got the greatest enthusiasm and confidence in the mission. And I want to help you.')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Office Space')
            .scrollIntoView()
            .siblings()
            .contains('Whatsssss happening, do you have those tps reports?')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Zathura: A Space Adventure')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        cy.get('.movie__details')
            .contains('Space Cowboys')
            .scrollIntoView()
            .siblings()
            .contains('Whatever you read here is untrue')
            // wait for management to approve
            .wait(500)

        // log out for good measure
        logOutForGoodMeasure()
    })

    it('Log in, then search for movies', () => {
        const uuid = () => Cypress._.random(0, 1e9)
        const id = uuid()

        // go to sign up and create user
        createUser(id)
        verifyUserCreated(id)

        // go to login page and log in
        loginOnImtdb(id)
        verifyLoginSuccesful()

        //check out all the movies
        cy.get('.header__title')
            .contains('All Movies')
        cy.get('[placeholder="Search for a movie"]')
            .should('exist')

        // Search for Star Trek   
        cy.get('[placeholder="Search for a movie"]')
            .type('Star Trek')
        cy.get('main')
            .contains('Star Trek')
            .should('not.contain', 'Star Wars')
            // wait for management to approve
            .wait(500)

        // Search for Star Wars   
        cy.get('[placeholder="Search for a movie"]')
            .type('{backspace}{backspace}{backspace}{backspace}')
            .type('Wars')
        cy.get('main')
            .contains('Star Wars')
            .should('not.contain', 'Star Trek')
            // wait for management to approve
            .wait(500)

        // Search for West
        cy.get('[placeholder="Search for a movie"]')
            .clear()
            .type('West')
        cy.get('main')
            .should('not.contain', 'Star Wars')
        cy.get('main')
            .contains('West')
            // wait for management to approve
            .wait(500)

        // Find Fievel
        cy.get('.movie__details')
            .contains('Fievel')
            .scrollIntoView()
            // wait for management to approve
            .wait(500)
            // press the button for more info
            .parents('li')
            .find('button')
            .click()

        // Verify we found Fievel
        cy.get('section')
            .contains('Fievel Goes West')
        cy.get('dl')
            .scrollIntoView()
            .should('contain', 'Title')
            .should('contain', 'An American Tail:')
            .should('contain', 'Year')
            .should('contain', '1991')
            // wait for management to approve
            .wait(500)

        // return to all movies
        cy.get('section')
            .contains('Show all movies')
            .get('button')
            .click()
            // wait for management to approve
            .wait(500)

        // log out for good measure
        logOutForGoodMeasure()
    })
})




const createUser = (id) => {
    // go to sign up page
    cy.get('#header_signUp')
        .click()
    cy.get('.header__title')
        .contains('Sign Up')

    // create user & password
    cy.get('#username')
        .type(`username${id}`)
    cy.get('#password')
        .type(`password${id}`)
    cy.get('#repeat-password')
        .type(`password${id}`)
    cy.get('button.login__submit')
        .click()

}

const verifyUserCreated = (id) => {

    cy.get('.cta__container')
        .contains('Created user')
    cy.get('dl')
        .contains(`username${id}`)
    cy.get('.header__title')
        .contains('Successfull Created a user')
        // wait for management to approve
        .wait(500)
}

const loginOnImtdb = (id) => {
    // go to login page
    cy.contains('Login')
        .click()
    cy.get('.header__title')
        .contains('Login')

    // log in    
    cy.get('#username')
        .type(`username${id}`)
        // wait for management to approve
        .wait(500)
    cy.get('#password')
        .type(`password${id}`)
        // wait for management to approve
        .wait(500)
    cy.get('button.login__submit')
        .click()
}

const verifyLoginSuccesful = () => {
    cy.get('#header_loggedInProfile')
        .contains('Profile')
    cy.get('#header_loggedInLogout')
        .contains('Logout')
}

const logOutForGoodMeasure = () => {
    cy.contains('Logout')
        .click()
    cy.get('.header__title')
        .contains('Movies')
    cy.get('#header_login')
        .contains('Login')
}