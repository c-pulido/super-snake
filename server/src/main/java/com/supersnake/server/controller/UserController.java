package com.supersnake.server.controller;

import com.supersnake.server.model.User;
import com.supersnake.server.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // New endpoint to get top 10 users sorted by high score
    @GetMapping("/top")
    public List<User> getTopUsers() {
        return userRepository.findTop10ByOrderByHighScoreDesc();
    }
}
