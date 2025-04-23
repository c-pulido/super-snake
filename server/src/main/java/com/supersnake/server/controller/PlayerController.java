package com.supersnake.server.controller;

import com.supersnake.server.model.User;
import com.supersnake.server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final UserRepository userRepository;

    public PlayerController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // DTO to receive the score update
    public static class ScoreRequest {
        public Long id;
        public int score;
    }

    @PostMapping
    public ResponseEntity<String> updateScore(@RequestBody ScoreRequest request) {
        Optional<User> userOpt = userRepository.findById(request.id);
        if (userOpt.isEmpty()) {
            System.out.println("❌ User not found for ID: " + request.id);
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        System.out.println("🔍 Current high score for " + user.getUsername() + ": " + user.getHighScore());
        System.out.println("📩 New score submitted: " + request.score);

        // Save only if score is higher
        if (request.score > user.getHighScore()) {
            user.setHighScore(request.score);
            userRepository.save(user);
            System.out.println("✅ Score updated for " + user.getUsername() + ": " + request.score);
        } else {
            System.out.println("⚠️ Score not updated (submitted score was not higher)");
        }

        return ResponseEntity.ok("Score updated");
    }
}
