package org.testcoders.movietest.steps;

import static org.assertj.core.api.Assertions.assertThat;

import io.cucumber.core.internal.com.fasterxml.jackson.core.JsonProcessingException;
import io.cucumber.core.internal.com.fasterxml.jackson.core.type.TypeReference;
import io.cucumber.core.internal.com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import java.util.List;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.dto.CreateMovieDto;
import org.testcoders.movietest.dto.MovieDto;
import org.testcoders.movietest.service.MovieService;
import org.testcoders.movietest.service.RestAssuredService;
import org.testcoders.movietest.state.State;

@AllArgsConstructor
public class MovieSteps {

  private final State state;
  private final MovieService movieService;
  private final ObjectMapper objectMapper;
  private final RestAssuredService restAssuredService;

  private final String BASE_URL = "v1/proxy/movies/";

  @When("i create the following movie")
  public void createMovie(CreateMovieDto movieDto) throws JsonProcessingException {
    String body = objectMapper.writeValueAsString(movieDto);
    Response response = restAssuredService.makePostWithToken(BASE_URL, body, state.getToken());
    state.setResponse(response);
  }

  @Then("i search movies for {string}")
  public void searchMovie(String string) {
    Response response = restAssuredService.makeGetWithToken(BASE_URL + "searches?query=" + string,
        state.getToken());
    state.setResponse(response);
  }

  @Then("the server returns the following movies")
  public void checkMovieResponse(List<MovieDto> table) throws JsonProcessingException {
    List<MovieDto> movies = getMovieDtosFromResponse();
    assertThat(movies.size()).isEqualTo(table.size());

    for (MovieDto expectedMovie : table) {
      MovieDto actualMovie = movies.stream()
          .filter(movie -> movie.imdb().equals(expectedMovie.imdb()))
          .findFirst()
          .orElseThrow(
              () -> new AssertionError("Expected movie not found: IMDB " + expectedMovie.imdb()));

      assertThat(actualMovie.title()).isEqualTo(expectedMovie.title());
      assertThat(actualMovie.type()).isEqualTo(expectedMovie.type());
      assertThat(actualMovie.year()).isEqualTo(expectedMovie.year());
    }
  }

  @Then("the server returns {int} movies")
  public void checkMovieResponseAmount(int amount) throws JsonProcessingException {
    List<MovieDto> movies = getMovieDtosFromResponse();
    assertThat(movies.size()).isEqualTo(amount);
  }

  @Given("we seed the movie database with {int} movies")
  public void seedMovies(int amount) {
    movieService.seedMovies(amount);
  }

  private List<MovieDto> getMovieDtosFromResponse() throws JsonProcessingException {
    return objectMapper.readValue(state.getResponse().getBody().print(), new TypeReference<>() {
    });
  }
}
