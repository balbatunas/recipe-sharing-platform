package lt.techin.recipe.controllers;

import jakarta.validation.Valid;
import lt.techin.recipe.models.User;
import lt.techin.recipe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.status(200).body(this.userRepository.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable int id) {
        if (userRepository.existsById(id)) {
            return ResponseEntity.status(200)
                    .body(this.userRepository.findById(id).get());
        }
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "User with Id " + id + " does not exist");

        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/users")
    public ResponseEntity<?> postUser(@Valid @RequestBody User user) {

        if (this.userRepository.existsByEmail(user.getEmail())) {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", "This user " + user.getUserName() + " already exist in this DB");
            return ResponseEntity.status(400).body(response);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody User user) {

        Optional<User> userDb = this.userRepository.findUserByEmail(user.getUserName());
        if (passwordEncoder.matches(user.getPassword(), userDb.get().getPassword())) {
            return userDb;
        }
        return null;
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> putUser(@Valid @PathVariable int id, @RequestBody User user) {
        if (this.userRepository.findById(id).isPresent()) {
            User userFromList = this.userRepository.findById(id).get();

            userFromList.setEmail(user.getEmail());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userFromList.setPassword(user.getPassword());

            return ResponseEntity.status(200).body(this.userRepository.save(userFromList));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        if (userRepository.existsById(id)) {
            this.userRepository.deleteById(id);
            return ResponseEntity.status(204).build();
        }
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "User with Id " + id + " does not exist");

        return ResponseEntity.status(404).body(response);
    }
}
