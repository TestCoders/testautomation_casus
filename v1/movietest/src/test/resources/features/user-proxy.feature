Feature: user proxy api test

  Scenario: 1. Creating a new admin
    When i request a token with the following admin
      | id | password | username  |
      | 1  | admin    | testadmin |
    And i create the following admin
      | username    | password |
      | danieladmin | test     |
    Then the server has returned status code 200
    And the following user is created in the database
      | username    | password | role  | active |
      | danieladmin | test     | admin | true   |

  Scenario: 2. Creating a new user
    When i create the following user
      | username   | password |
      | danielUser | test     |
    Then the server has returned status code 200
    And the following user is created in the database
      | username   | password | role | active |
      | danieluser | test     | user | true   |

  Scenario: 3. Create a new admin with a newly created admin
    When i request a token with the following admin
      | id | password | username  |
      | 1  | admin    | testadmin |
    And i create the following admin
      | username    | password |
      | danieladmin | test     |
    Then the server has returned status code 200
    And the following user is created in the database
      | username    | password | role  | active |
      | danieladmin | test     | admin | true   |
    Then i delete the token in the state
    And i request a token with the following admin
      | id   | password | username    |
      | <id> | test     | danieladmin |
    Then the server has returned status code 200
    And i create the following admin
      | username     | password |
      | danieladmin2 | test     |
    Then the server has returned status code 200