package lt.techin.recipe.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(max = 135, message = "Maximum length is 135 characters")
    @Pattern(
            regexp = "^[A-Z][a-zA-Z]+$",
            message = ("You can only enter letters. First letter must be capital. At least 2 characters long"))
    private String firstName;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(max = 100, message = "Maximum length is 100 characters")
    @Pattern(
            regexp = "^[A-Z][a-zA-Z]+$",
            message = ("You can only enter letters. First letter must be capital. At least 2 characters long"))
    private String lastName;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(max = 255, message = "Maximum length is 255 characters")
    @Pattern(
            regexp = "^([a-zA-Z0-9]+ )*[a-zA-Z0-9]+$",
            message =
                    "You can only enter letters or numbers. At least 1 character long. Cannot begin or end with a space. No more than one space between words")
    private String username;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(min = 5, max = 200, message = "Minimum length 5 characters, maximum length 200 characters")
    @Email(message = "Does not match correct email format")
    private String email;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(min = 8, max = 255, message = "Minimum length 8 characters, maximum length 255 characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$",
            message =
                    "Must contain at least one uppercase letter, one lowercase letter, one number, and any one of these special symbols: !@#$%^&*")
    private String password;

    @NotNull(message = "Cannot be null or empty")
    private LocalDate dateOfBirth;

    @Length(min = 4, max = 6)
    private String gender;

    @NotNull
    private String country;

    @NotNull
    private boolean isPrivacyPolicyAccepted;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Users_Roles",
            joinColumns = @JoinColumn(name = "User_id"),
            inverseJoinColumns = @JoinColumn(name = "Role_id"))
    //    @NotNull
    private List<Role> roles;

    public User(
            String firstName,
            String lastName,
            String username,
            String email,
            String password,
            LocalDate dateOfBirth,
            String gender,
            String country,
            boolean isPrivacyPolicyAccepted) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.country = country;
        this.isPrivacyPolicyAccepted = isPrivacyPolicyAccepted;
    }

    public User() {}

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public long getId() {
        return id;
    }
}
