// server/src/main/java/com/supersnake/server/repository/UserRepository.java
package com.supersnake.server.repository;

import com.supersnake.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findTopByUsernameStartingWithOrderByIdDesc(String prefix);
}
