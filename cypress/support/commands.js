// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('adminLogin', () => {
    cy.request({
        url: 'http://localhost:8080/v1/proxy/tokens/',
        method: 'POST',
        followRedirect: true,
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: {
        "id": 1,
        "username": "testadmin",
        "password": "admin"
        }
    }).then((response) => {
        const token = response.body.access_token;
        Cypress.env('accessToken', token);
    });
});

Cypress.Commands.add('userLogin', () => {
    cy.request({
        url: 'http://localhost:8080/v1/proxy/tokens/',
        method: 'POST',
        followRedirect: true,
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: {
        "id": 2,
        "username": "testuser",
        "password": "user"
        }
    }).then((response) => {
        const token = response.body.access_token;
        Cypress.env('accessToken', token);
    });
});

Cypress.Commands.add('getRequest', (url, token) => {
    return cy.request({
        method: 'GET', 
        url: url, 
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('postRequest', (url, body, token) => {
    cy.log(JSON.stringify(body));
    return cy.request({
        method: 'POST',
        url: url,
        body: body,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        followRedirect: true
    })
});