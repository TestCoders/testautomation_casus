package org.testcoders.movietest.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.testcoders.movietest.model.Movie;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {

}
