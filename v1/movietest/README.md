# Movietest

Movietest is a testautomation project based on Java with Cucumber, Spring and RestAssured.
In this Proof of Concept we have several tests that are running against the proxy API for movies, users and tokens. 
The backend APIs are supported, but not yet implemented.

# RUN Production
To run this project simply type 'docker-compose up' in the testautomation_casus_cucumber project folder. This runs Movietest after Dataseeder is finished. 
When running in detached mode ('docker-compose up -d') you can inspect the logs by running the command: 'docker-compose logs movietest'.

# RUN Localhost
After running 'docker-compose up' you can run the cucumber tests locally. 

Steps: 

1. Right mouse click on /v1/movietest/pom.xml and press '+ Add as Maven Project'
2. Right mouse click on /v1/movietest/src/test/java/CucumberRunner.java and press run 'CucumberRunner'
3. This runs all feature files defined in /v1/movietest/src/resources/features
4. To run singular feature files press right mouse click on a .feature (or the folder 'features') and press run 'your .feature'

# Useful IntelliJ plugins
Most of these should be installed by default. 

1. Cucumber for Java
2. Gherkin (default)
3. Lombok
4. Sonarlint

# Databases
Movietest has support for directly interacting with both the mongodb and the postgresql database. Before every cucumber scenario the database is fully cleaned and reseeded. 

# Known Issues
1. Logging is broken
2. Scenario 1 in movie-proxy.feature is failing due to getting 501. 

# Improvements
1. Implementing Playwright for testing the frontend
2. Implementing Wiremock. Useful for mocking the proxy and testing the frontend independently of the backend.
3. Better dataseeding and control over dataseeding and Test Data Management. For PoC purposes there is a Dataseeder with Faker for movies. 
