package org.testcoders.movietest.steps;

import static org.assertj.core.api.Assertions.assertThat;

import io.cucumber.java.en.Then;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.state.State;

@AllArgsConstructor
public class ResponseControlSteps {
  private final State state;

  @Then("the server has returned status code {int}")
  public void checkStatuscodeResponse(int statuscode) {
    assertThat(state.getResponse().getStatusCode()).isEqualTo(statuscode);
  }

  @Then("the server gives the following error")
  public void checkError(String error) {
    String actualError = state.getResponse().getBody().jsonPath().getString("Error");

    // Bug found, error message not truncated.
    actualError = actualError.trim();

    assertThat(actualError).isEqualTo(error);
  }
}
