package lt.techin.recipe.controllers;

import jakarta.validation.Valid;
import lt.techin.recipe.models.User;
import lt.techin.recipe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin
@RestController
public class UserController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void UserRepository(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    public ResponseEntity<?> postUser(@Valid @RequestBody User user) {

        if (this.userRepository.existsByEmail(user.getEmail())) {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", "This user " + user.getUsername() + " already exist in this DB");
            return ResponseEntity.status(400).body(response);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }


}
