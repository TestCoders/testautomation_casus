package org.testcoders.movietest.steps;

import static org.assertj.core.api.Assertions.assertThat;

import io.cucumber.core.internal.com.fasterxml.jackson.core.JsonProcessingException;
import io.cucumber.core.internal.com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.datatable.UserDatatable;
import org.testcoders.movietest.dto.UserDto;
import org.testcoders.movietest.model.User;
import org.testcoders.movietest.repository.UserRepository;
import org.testcoders.movietest.service.RestAssuredService;
import org.testcoders.movietest.state.State;

@AllArgsConstructor
public class UserSteps {

  private final State state;
  private final ObjectMapper objectMapper;
  private final UserRepository userRepository;
  private final RestAssuredService restAssuredService;

  private final String BASE_URL = "/v1/proxy/users/";

  @When("i request all users")
  public void getUsers() {
    Response response = restAssuredService.makeGetWithToken(BASE_URL, state.getToken());
    state.setResponse(response);
  }

  @When("i create the following user/users")
  public void createUsers(UserDto userDto) throws JsonProcessingException {
    String body = objectMapper.writeValueAsString(userDto);
    Response response = restAssuredService.makePost(BASE_URL, body);
    state.setResponse(response);
  }

  @When("i create the following admin")
  public void createAdmin(UserDto userDto) throws JsonProcessingException {
    String body = objectMapper.writeValueAsString(userDto);
    Response response = restAssuredService.makePostWithToken(BASE_URL + "admins", body,
        state.getToken());
    state.setResponse(response);
  }

  @Then("the following user is created in the database")
  public void checkUser(UserDatatable userDatatable) {
    User user = userRepository.findByUsername(userDatatable.username()).orElseThrow();
    // username implicitly tested by finding it in the repository
    assertThat(user.getPassword()).isNotBlank();
    assertThat(user.getPassword()).isNotEqualTo(userDatatable.password());
    assertThat(user.getRole()).isEqualTo(userDatatable.role());
    assertThat(user.isActive()).isEqualTo(userDatatable.active());
  }
}
