package lt.techin.recipe.repositories;

import lt.techin.recipe.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByEmailAndPassword(String email, String password);

    //    boolean findUserByUsernameAndPassword(String name, String password);

    boolean existsByEmail(String name);
}
