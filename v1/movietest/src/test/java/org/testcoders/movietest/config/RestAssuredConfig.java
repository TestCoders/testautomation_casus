package org.testcoders.movietest.config;

import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class RestAssuredConfig {

  @Value("${proxy.host}")
  private String proxyHost;

  @Value("${proxy.port}")
  private int proxyPort;

  @Value("${movie.host}")
  private String movieHost;

  @Value("${movie.port}")
  private int moviePort;

  @Value("${user.host}")
  private String userHost;

  @Value("${user.port}")
  private int userPort;

  public static RequestSpecification getBaseSpec() {
    return RestAssured.given()
        .contentType(ContentType.JSON)
        .accept(ContentType.JSON);
  }

  @PostConstruct
  public void setupProxy() {
    RestAssured.baseURI = getBaseURI(proxyHost, proxyPort);
    RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
    log.info("RestAssured setup with baseURI: " + RestAssured.baseURI);
  }
  public void setupMovies() {
    RestAssured.baseURI = getBaseURI(movieHost, moviePort);
  }

  public void setupUsers() {
    RestAssured.baseURI = getBaseURI(userHost, userPort);

  }

  private String getBaseURI(String host, int port) {
    return "http://%s:%d".formatted(host, port);
  }
}
