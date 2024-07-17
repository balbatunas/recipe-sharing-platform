package lt.techin.recipe.controllers;

import com.sanctionco.jmail.JMail;
import jakarta.validation.Valid;
import lt.techin.recipe.models.Role;
import lt.techin.recipe.models.User;
import lt.techin.recipe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;

@CrossOrigin("http://localhost:5173")
@RestController
public class UserController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void UserRepository(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> postUser(@Valid @RequestBody User user) {
        HashMap<String, String> response = new HashMap<>();

        if (this.userRepository.existsByDisplayName(user.getDisplayName())) {
            response.put("displayName", "Already exists");
            return ResponseEntity.status(400).body(response);
        }

        if (JMail.strictValidator().isInvalid(user.getEmail())) {
            response.put("email", "Does not match correct email format");
            return ResponseEntity.status(400).body(response);
        }

        if (this.userRepository.existsByEmail(user.getEmail())) {
            response.put("email", "Already exists");
            return ResponseEntity.status(400).body(response);
        }

        // Naudojame if sakini, kadangi nera tokios anotacijos
        if (user.getDateOfBirth().isBefore(LocalDate.of(1900, 1, 1))
                || ChronoUnit.YEARS.between(user.getDateOfBirth(), LocalDate.now()) < 13) {
            response.put("dateOfBirth", "Cannot be older than the year 1900, or younger than 13 years old");
            return ResponseEntity.status(400).body(response);
        }

        for (Role role : user.getRoles()) {
            if (role.getId() == null) {
                response.put("id", "Cannot be null");
                return ResponseEntity.status(400).body(response);
            }
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }
}
