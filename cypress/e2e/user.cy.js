describe('template spec', () => {

  before(() => {
    cy.adminLogin();
  });

  it('Creates a movie in Testcoders testautomation casus', () => {
    cy.getRequest('/v1/proxy/users/', Cypress.env('accessToken')).then((newUserResponse) => {
        expect(newUserResponse.status).to.eq(200);
        cy.log(JSON.stringify(newUserResponse.body.allUsers[1]));
        Cypress.env('userId', newUserResponse.body.allUsers[1].id);
        Cypress.env('userName', newUserResponse.body.allUsers[1].userName);
        Cypress.env('userPassword', 'user');
    });

    const tokenBody = { "id": 2, "password": "user", "username": "testuser" };

    cy.postRequest('/v1/proxy/tokens/', tokenBody, Cypress.env('accessToken')).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('userAccessToken', response.body.access_token);
    });

    cy.getRequest('/v1/proxy/movies/', Cypress.env('userAccessToken')).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');    

      /*
        "description": "Whatever you read here is untrue",
        "image": "https://m.media-amazon.com/images/M/MV5BMTk4NzAwOTkwMF5BMl5BanBnXkFtZTYwMDM3MTM3._V1_.jpg",
        "imdb": "tt0186566",
        "title": "Space Cowboys",
        "type": "movie",
        "year": 2000
    */
      expect(response.body[0]).to.have.property('description');
      expect(response.body[0]).to.have.property('image');
      expect(response.body[0]).to.have.property('imdb');
      expect(response.body[0]).to.have.property('title');
      expect(response.body[0]).to.have.property('type');
      expect(response.body[0]).to.have.property('year');
    });

    cy.getRequest('/v1/proxy/movies/searches?query=rvo', Cypress.env('accessToken')).then((response) => {
        expect(response.status).to.eq(404); 
    });

    
    /*
    This call is not implemented yet

    cy.postRequest('/v1/proxy/movies/', {
        'imdb': 'tt0184266',
        'title': 'RVO',
        'type': 'movie',
        'year': 2014
      }, Cypress.env('userAccessToken')).then((response) => {
        expect(response.status).to.eq(501); // Not implemented in the backend.
      });
      */
  });
});