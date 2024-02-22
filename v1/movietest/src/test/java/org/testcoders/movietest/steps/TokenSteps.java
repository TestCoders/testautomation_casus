package org.testcoders.movietest.steps;

import io.cucumber.core.internal.com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import java.io.IOException;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.datatable.TokenRequestDatatable;
import org.testcoders.movietest.dto.TokenRequestDto;
import org.testcoders.movietest.service.RestAssuredService;
import org.testcoders.movietest.state.State;

@AllArgsConstructor
public class TokenSteps {

  private final State state;
  private final ObjectMapper objectMapper;
  private final RestAssuredService restAssuredService;

  private final String BASE_URL = "v1/proxy/tokens/";

  @When("i request a token with the following admin")
  public void requestToken(TokenRequestDatatable tokenRequestDatatable) throws IOException {
    // If the id in the datatable equals <id> we take the id in the State Response Body
    int id = tokenRequestDatatable.id().equals("<id>")
        ? Integer.parseInt(state.getResponse().body().jsonPath().getString("id"))
        : Integer.parseInt(tokenRequestDatatable.id());

    TokenRequestDto tokenRequestDto = new TokenRequestDto(id, tokenRequestDatatable.password(),
        tokenRequestDatatable.username());
    String body = objectMapper.writeValueAsString(tokenRequestDto);

    Response response = restAssuredService.makePost(BASE_URL, body);

    state.setResponse(response);
    state.setToken(response.getBody().jsonPath().getString("access_token"));
  }
}
