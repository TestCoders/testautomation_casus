package org.testcoders.movietest.repository;

import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.testcoders.movietest.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

  @Transactional
  @Modifying
  @Query(nativeQuery = true, value = "TRUNCATE users CASCADE")
  void emptyDatabase();

  Optional<User> findByUsername(String name);

}
