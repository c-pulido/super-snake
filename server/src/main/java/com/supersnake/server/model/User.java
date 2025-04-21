// server/src/main/java/com/supersnake/server/model/User.java
package com.supersnake.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String skin;

    @Column(name = "high_score")
    private int highScore;

    public User() {
    }

    public User(String username, String password, String skin, int highScore) {
        this.username = username;
        this.password = password;
        this.skin = skin;
        this.highScore = highScore;
    }

    // GETTERS AND SETTERS

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSkin() {
        return skin;
    }

    public void setSkin(String skin) {
        this.skin = skin;
    }

    public int getHighScore() {
        return highScore;
    }

    public void setHighScore(int highScore) {
        this.highScore = highScore;
    }
}
