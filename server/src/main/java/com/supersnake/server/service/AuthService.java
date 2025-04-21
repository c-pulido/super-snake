package com.supersnake.server.service;

import com.supersnake.server.model.User;
import com.supersnake.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User signup(String username, String rawPassword) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(username, encodedPassword, null, 0);

        return userRepository.save(user);
    }

    public User login(String username, String rawPassword) {
        System.out.println("Attempting login with: " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            System.out.println("Password mismatch for user: " + username);
            throw new RuntimeException("Invalid username or password");
        }

        System.out.println("Login successful for: " + username);
        return user;
    }

    public User createGuestUser() {
        for (int i = 1; i <= 1000; i++) {
            String guestUsername = String.format("Guest%03d", i);
            Optional<User> existing = userRepository.findByUsername(guestUsername);
            if (existing.isEmpty()) {
                User guest = new User(guestUsername, "", null, 0);
                return userRepository.save(guest);
            }
        }
        throw new RuntimeException("Maximum number of guest users reached.");
    }
}
