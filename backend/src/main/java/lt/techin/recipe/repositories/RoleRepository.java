package lt.techin.recipe.repositories;

import lt.techin.recipe.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {}
