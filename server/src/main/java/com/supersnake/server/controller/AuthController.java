package com.supersnake.server.controller;

import com.supersnake.server.model.User;
import com.supersnake.server.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    record AuthRequest(String username, String password) {}

    @PostMapping("/signup")
    public User signup(@RequestBody AuthRequest request) {
        return authService.signup(request.username(), request.password());
    }

    @PostMapping("/login")
    public User login(@RequestBody AuthRequest request) {
        return authService.login(request.username(), request.password());
    }
}
