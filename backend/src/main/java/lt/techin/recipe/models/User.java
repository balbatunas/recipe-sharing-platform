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
            message = "You can only enter English letters. First letter must be capital. At least 2 characters long")
    private String firstName;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(max = 100, message = "Maximum length is 100 characters")
    @Pattern(
            regexp = "^[A-Z][a-zA-Z]+$",
            message = "You can only enter English letters. First letter must be capital. At least 2 characters long")
    private String lastName;

    @NotEmpty(message = "Cannot be null or empty")
    @Length(max = 255, message = "Maximum length is 255 characters")
    @Pattern(
            regexp = "^([a-zA-Z0-9]+ )*[a-zA-Z0-9]+$",
            message =
                    "You can only enter English letters or numbers. At least 1 character long. Cannot begin or end with a space. No more than one space between words")
    @Pattern(
            regexp = "^(?!.*(fuck|shit|damn|bitch|crap|asshole|bastard|dick|piss|cunt)).*$",
            message = "Display name contains inappropriate language")
    private String displayName;

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

    @Pattern(regexp = "^(Female|Male|Other)$", message = "Must be Female, Male, or Other")
    private String gender;

    @NotEmpty(message = "Cannot be null or empty")
    @Pattern(
            regexp =
                    "^(Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Democratic Republic of the Congo|Republic of the Congo|Costa Rica|Croatia|Cuba|Cyprus|Czech Republic|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|North Korea|South Korea|Kosovo|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Taiwan|Tajikistan|Tanzania|Thailand|East Timor|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe)$",
            message = "Must be a valid country name. It should start with an uppercase letter. English only")
    private String country;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Users_roles",
            joinColumns = @JoinColumn(name = "User_id"),
            inverseJoinColumns = @JoinColumn(name = "Role_id"))
    @NotEmpty(message = "Cannot be null or empty")
    private List<Role> roles;

    public User(
            String firstName,
            String lastName,
            String displayName,
            String email,
            String password,
            LocalDate dateOfBirth,
            String gender,
            String country,
            List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.country = country;
        this.roles = roles;
    }

    public User() {}

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
