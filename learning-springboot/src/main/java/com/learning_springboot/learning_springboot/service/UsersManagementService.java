package com.learning_springboot.learning_springboot.service;

import com.learning_springboot.learning_springboot.dto.ReqRes;
import com.learning_springboot.learning_springboot.entity.MyUsers;
import com.learning_springboot.learning_springboot.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UsersManagementService {
    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
            MyUsers newUser = new MyUsers();

            newUser.setName(registrationRequest.getName());
            newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            newUser.setEmail(registrationRequest.getEmail());
            newUser.setRole(registrationRequest.getRole());
            MyUsers result = usersRepo.save(newUser);

            if (result.getId()>0) {
                resp.setMyUsers(result);
                resp.setMessage("Successfully registered");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes resp = new ReqRes();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()
            ));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            resp.setStatusCode(200);
            resp.setToken(jwt);
            resp.setRefreshToken(refreshToken);
            resp.setExpirationTime("24hrs");
            resp.setMessage("Successful login");
            resp.setMyUsers(user);

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage(e.getMessage());
        }
        return resp;
    }

    public ReqRes refreshToken(ReqRes refreshRequest) {
        ReqRes resp = new ReqRes();

        try {
            String myEmail = jwtUtils.extractUsername(refreshRequest.getToken());
            MyUsers users = usersRepo.findByEmail(myEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshRequest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                resp.setStatusCode(200);
                resp.setToken(jwt);
                resp.setRefreshToken(refreshRequest.getToken());
                resp.setExpirationTime("24hrs");
                resp.setMessage("Successful refresh");
            }
            resp.setStatusCode(200);
            return resp;
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            return resp;
        }
    }

}
