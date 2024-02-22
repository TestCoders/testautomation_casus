package org.testcoders.movietest.steps;

import io.cucumber.java.en.When;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.state.State;

@AllArgsConstructor
public class StateManagementSteps {
  private final State state;

  @When("i delete the token in the state")
  public void deleteToken() {
    state.setToken(null);
  }

  @When("i set the token to {string}")
  public void setToken(String token) {
    state.setToken(token);
  }
}
