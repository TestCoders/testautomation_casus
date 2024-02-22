package org.testcoders.movietest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
  @Id
  private int Id;
  private String username;
  private String password;
  private String role;
  private boolean active;
}
