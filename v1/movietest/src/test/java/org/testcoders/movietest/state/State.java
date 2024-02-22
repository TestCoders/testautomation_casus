package org.testcoders.movietest.state;

import static io.cucumber.spring.CucumberTestContext.SCOPE_CUCUMBER_GLUE;

import io.restassured.response.Response;
import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(SCOPE_CUCUMBER_GLUE)
@Data
public class State {

  private Response response;
  private String token;
}
