package org.testcoders.movietest.hooks;

import io.cucumber.java.Before;
import java.util.List;
import lombok.AllArgsConstructor;
import org.testcoders.movietest.model.Movie;
import org.testcoders.movietest.model.User;
import org.testcoders.movietest.repository.MovieRepository;
import org.testcoders.movietest.repository.UserRepository;

@AllArgsConstructor
public class DataCleaner {

  private final UserRepository userRepository;
  private final MovieRepository movieRepository;

  @Before
  public void cleanUserData() {
    while (userRepository.findAll().size() != 2) {
      Thread.sleep(1000); // Wait for 1 second before checking again
    }
    // Find the default Admin and User and keep them
    User admin = userRepository.findById(1).orElseThrow();
    User user = userRepository.findById(2).orElseThrow();
    userRepository.emptyDatabase();
    userRepository.save(admin);
    userRepository.save(user);
  }

  @Before
  public void cleanMovieData() {
    List<Movie> movie = movieRepository.findAll();
    // Get all movies in the MongoDB and keep the first 34 movies that were seeded by Dataseeder.
    List<Movie> movieCleaned = movie
        .stream()
        .limit(34)
        .toList();
    movieRepository.deleteAll();
    movieRepository.saveAll(movieCleaned);
  }
}
