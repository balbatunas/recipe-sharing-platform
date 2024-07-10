package lt.techin.recipe.repositories;

import lt.techin.recipe.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String name);
}
