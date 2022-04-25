package com.example.dental.controller;

import com.example.dental.message.request.LoginRequest;
import com.example.dental.message.response.JwtResponse;
import com.example.dental.message.response.ResponseMessage;
import com.example.dental.registration.RegistrationRequest;
import com.example.dental.registration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@AllArgsConstructor
@RequestMapping("/restApi/auth")
public class AuthRESTController {

    private final RegistrationService registrationService;

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        registrationService.register(registrationRequest);
        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }

    @GetMapping("confirm")
    public ResponseEntity<Void> confirm(@RequestParam String token) {
        registrationService.confirmToken(token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) {
        JwtResponse jwtResponse = registrationService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }
}
