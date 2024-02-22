package org.testcoders.movietest.service;

import com.github.javafaker.Faker;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.testcoders.movietest.model.Movie;
import org.testcoders.movietest.repository.MovieRepository;


@Service
@AllArgsConstructor
public class MovieService {

  private MovieRepository movieRepository;

  /**
   * Seeds the movie database with faked data
   * Uses a standard seed
   * @param numberOfMovies the amount of movies to generate
   */
  public void seedMovies(int numberOfMovies) {
    List<Movie> movies = new ArrayList<>();
    Faker faker = new Faker(new Random(11235813));

    for (int i = 0; i < numberOfMovies; i++) {
      Movie movie = new Movie();
      movie.set_id(new ObjectId().toString());
      movie.setTitle(faker.book().title());
      movie.setYear(faker.number().numberBetween(1900, 2022));
      movie.setImdb("tt" + faker.number().digits(7));
      movie.setDescription(faker.lorem().sentence());
      movie.setType("movie");
      movie.setImage(faker.internet().avatar());

      movies.add(movie);
    }
    movieRepository.saveAll(movies);
  }
}
