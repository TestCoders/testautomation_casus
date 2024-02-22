Feature: user proxy api errors

  Scenario: 1. Creating a new user twice
    When i create the following user
      | username   | password |
      | danieluser | test     |
    Then the server has returned status code 200
    And the following user is created in the database
      | username   | password | role | active |
      | danieluser | test     | user | true   |
    When i create the following user
      | username   | password |
      | danieluser | test     |
    And the server has returned status code 400
    And the server gives the following error
    | User: danieluser already exists |
    
  Scenario: 2. Creating an admin with a garbage token
    When i set the token to "12345"
    And i create the following admin
      | username    | password |
      | danieladmin | test     |
    Then the server has returned status code 422