package com.example.dental.registration;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String firstname;
    private final String lastname;
    private final String email;
    private final String phone;
    private final String password;
    private final Set<String> role;
}
