package lt.techin.recipe.models;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "Roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //    @NotNull
    //    @Length(min = 1, max = 100)
    private String roleName;

    public int getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Role(String role_name, int id) {
        this.roleName = role_name;
        this.id = id;
    }

    public Role() {}

    //    @Override
    public String getAuthority() {
        return this.roleName;
    }
}
