package lt.techin.recipe.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Users_Roles",
            joinColumns = @JoinColumn(name = "User_id"),
            inverseJoinColumns = @JoinColumn(name = "Role_id"))
    @NotNull
    private List<Role> roles;

    public User(
            String firstName,
            String lastName,
            String userName,
            String email,
            String password,
            LocalDate dateOfBirth,
            String gender,
            String country,
            boolean isPrivacyPolicyAccepted) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.country = country;
        this.isPrivacyPolicyAccepted = isPrivacyPolicyAccepted;
    }

    public User() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Length(min = 2, max = 135)
    @Pattern(regexp = "^[A-Z][a-zA-Z]+$", message = ("You must enter only letters. First letter must be capital one"))
    private String firstName;

    @Length(min = 2, max = 100)
    @NotNull
    @Pattern(regexp = "^[A-Z][a-zA-Z]+$", message = ("You must enter only letters. First letter must be capital one"))
    private String lastName;

    @Length(min = 1, max = 255)
    @NotNull
    @Pattern(
            regexp = "^[a-zA-Z0-9][A-Z0-9 ]*$",
            message = ("You must enter only letters.")) // Cannot contain more that one space after another one
    private String userName;

    @NotNull
    @Length(min = 5, max = 200)
    private String email;

    @NotNull
    @Length(min = 8, max = 255)
    @Pattern(
            regexp = "(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*)",
            message =
                    ("Must contain at least one uppercase, lowercase letter, number, and any of these special symbols: !@#$%^&*"))
    private String password;

    @Min(1900)
    @Max(2011)
    @NotNull
    private LocalDate dateOfBirth;

    @Length(min = 4, max = 6)
    private String gender;

    @NotNull
    private String country;

    @NotNull
    private boolean isPrivacyPolicyAccepted;

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public void setPassword(String password) {
        this.password = password;
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
