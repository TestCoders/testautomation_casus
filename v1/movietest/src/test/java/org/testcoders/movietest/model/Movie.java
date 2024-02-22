package org.testcoders.movietest.model;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("movies")
public class Movie {
  @Id
  private String _id;
  private String title;
  private int year;
  private String imdb;
  private String description;
  private String type;
  private String image;
}
