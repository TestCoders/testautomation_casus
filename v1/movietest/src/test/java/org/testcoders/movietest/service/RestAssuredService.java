package org.testcoders.movietest.service;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.testcoders.movietest.config.RestAssuredConfig;

@Service
@AllArgsConstructor
public class RestAssuredService {

  private final RequestSpecification spec = RestAssuredConfig.getBaseSpec();

  public Response makeGetWithToken(String url, String token) {
    return RestAssured
        .given()
        .header("Authorization", "Bearer " + token)
        .get(url);
  }

  public Response makeGet(String url) {
    return RestAssured
        .given()
        .get(url);
  }

  public Response makePost(String url, String body) {
    return RestAssured
        .given()
        .spec(spec)
        .body(body)
        .post(url);
  }

  public Response makePostWithToken(String url, String body, String token) {
    return RestAssured
        .given()
        .spec(spec)
        .header("Authorization", "Bearer " + token)
        .body(body)
        .post(url);
  }
}
