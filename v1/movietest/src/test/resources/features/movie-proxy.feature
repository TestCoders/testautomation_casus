Feature: movie proxy

  Scenario: 1. Adding a movie
    When i request a token with the following admin
      | id | password | username  |
      | 1  | admin    | testadmin |
    Then i create the following movie
      | imdb | title                             | type  | year |
      | test | De wilde avonturen van Testcoders | movie | 2024 |
    Then the server has returned status code 501

  Scenario: 2. Searching for a set of movies
    When i request a token with the following admin
      | id | password | username  |
      | 1  | admin    | testadmin |
    And i search movies for "Star Wars"
    Then the server returns the following movies
      | imdb      | title                                          | type  | year |
      | tt0120915 | Star Wars: Episode I - The Phantom Menace      | movie | 1999 |
      | tt0121765 | Star Wars: Episode II - Attack of the Clones   | movie | 2002 |
      | tt0121766 | Star Wars: Episode III - Revenge of the Sith   | movie | 2005 |
      | tt0076759 | Star Wars: Episode IV - A New Hope             | movie | 1977 |
      | tt0080684 | Star Wars: Episode V - The Empire Strikes Back | movie | 1980 |
      | tt0086190 | Star Wars: Episode VI - Return of the Jedi     | movie | 1983 |

  Scenario: 3. Searching for a set of movies with large database
    Given we seed the movie database with 10000 movies
    When i request a token with the following admin
      | id | password | username  |
      | 1  | admin    | testadmin |
    And i search movies for "Cabbages"
    Then the server returns 59 movies
