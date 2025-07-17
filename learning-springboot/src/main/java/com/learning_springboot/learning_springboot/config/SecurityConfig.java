package com.learning_springboot.learning_springboot.config;

import com.learning_springboot.learning_springboot.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/auth/**", "/public/**").permitAll()

                        // Endpointy dostępne tylko dla ADMIN
                        .requestMatchers("/admin/**").hasAuthority("ADMIN")

                        // Endpointy dostępne tylko dla STUDENT
                        .requestMatchers("/student/**").hasAuthority("STUDENT")

                        // Endpointy dostępne tylko dla TUTOR
                        .requestMatchers("/tutor/**").hasAuthority("TUTOR")

                        // Endpointy dostępne dla wszystkich trzech ról
                        .requestMatchers("/all/**").hasAnyAuthority("ADMIN", "STUDENT", "TUTOR")

                        // Endpointy związane z kategoriamii (pomimo PreAuthorize w serwisie)
                        .requestMatchers(HttpMethod.GET, "/categories").hasAnyAuthority("ADMIN", "STUDENT", "TUTOR")
                        .requestMatchers(HttpMethod.POST, "/categories").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/categories").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/categories").hasAuthority("ADMIN")

                        // Wymagaj autoryzacji dla pozostałych żądań
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(myUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }
}
