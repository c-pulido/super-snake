// server/src/main/java/com/supersnake/server/config/SecurityConfig.java
package com.supersnake.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/players/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic().disable()
            .formLogin().disable();
        return http.build();
    }
}
