package com.example.dental.user;

import com.example.dental.exception.UserNotFoundException;
import com.example.dental.registration.EmailValidator;
import com.example.dental.registration.RegistrationRequest;
import com.example.dental.registration.token.ConfirmationToken;
import com.example.dental.registration.token.ConfirmationTokenService;
import com.example.dental.role.AppUserRole;
import com.example.dental.role.Role;
import com.example.dental.role.RoleRepository;
import com.example.dental.security.service.UserPrinciple;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_EMAIL_MSG = "User with email %s not found";
    private final static String USER_ID_NOT_FOUND_MSG = "User with ID {%s} not found";
    private final static String USER_ALREADY_EXISTS_MSG = "User with that email: %s already exists";
    private final static Integer EXPIRY_TIME_IN_MIN = 15;
    private final static String EMAIL_NOT_VALID_MSG = "email %s not valid";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailValidator emailValidator;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                 .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_EMAIL_MSG, email)));

        return UserPrinciple.build(user);
    }

    public void enableUser(String email) {
        userRepository.enableAppUser(email);
    }

    // TODO: write proper QUERY for Role
    public List<User> findAllPatients() {
        return userRepository.findAllByRolesContaining(roleRepository.findByName(AppUserRole.PATIENT));
    }

    public User findPatient(Long userId) {
        return userRepository.findByUserId(userId).get();
    }

    public List<User> findAllDentists() {
        return userRepository.findAllByRolesContaining(roleRepository.findByName(AppUserRole.DENTIST));
    }

    public List<User> findAllAdmins() {
        return userRepository.findAllByRolesContaining(roleRepository.findByName(AppUserRole.ADMIN));
    }

    public User findUserByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public User addRole(Long userId, AppUserRole role) {
        User user = userRepository.findByUserId(userId).
                orElseThrow(() -> new UserNotFoundException(USER_ID_NOT_FOUND_MSG));
        user.getRoles().add(roleRepository.findByName(role));
        userRepository.save(user);
        return user;
    }

    public User removeRole(Long userId, AppUserRole role) {
        User user = userRepository.findByUserId(userId).
                orElseThrow(() -> new UserNotFoundException(USER_ID_NOT_FOUND_MSG));
        user.getRoles().remove(roleRepository.findByName(role));
        userRepository.save(user);
        return user;
    }

    public User setBlocked(Long userId, Boolean blocked) {
        User user = userRepository.findByUserId(userId).
                orElseThrow(() -> new UserNotFoundException(USER_ID_NOT_FOUND_MSG));
        user.setLocked(blocked);
        userRepository.save(user);
        return user;
    }

    public String signUp(User user) {
        boolean userExists = userRepository.existsByEmail(user.getEmail());

        if (userExists) {
            throw new IllegalStateException(String.format(USER_ALREADY_EXISTS_MSG, user.getEmail()));
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(AppUserRole.PATIENT);
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        String createdToken = UUID.randomUUID().toString();
        ConfirmationToken token = new ConfirmationToken(
                createdToken,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(EXPIRY_TIME_IN_MIN),
                user
        );

        confirmationTokenService.saveConfirmationToken(token);

        return createdToken;
    }

    public void registerAdmin(RegistrationRequest registrationRequest) {
        boolean isValidEmail = emailValidator.test(registrationRequest.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException(String.format(EMAIL_NOT_VALID_MSG, registrationRequest.getEmail()));
        }

        boolean doesUserExist = userRepository.existsByEmail(registrationRequest.getEmail());
        if (doesUserExist) {
            throw new IllegalStateException(String.format(USER_ALREADY_EXISTS_MSG, registrationRequest.getEmail()));
        }

        Set<Role> roles = new HashSet<>();
        Role aRole = roleRepository.findByName(AppUserRole.ADMIN);
        roles.add(aRole);

        User newUser = new User(
                registrationRequest.getFirstname(),
                registrationRequest.getLastname(),
                registrationRequest.getEmail(),
                registrationRequest.getPhone(),
                registrationRequest.getPassword(),
                false,
                true,
                roles
        );

        String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);
    }
    public void registerDentist(RegistrationRequest registrationRequest) {
        boolean isValidEmail = emailValidator.test(registrationRequest.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException(String.format(EMAIL_NOT_VALID_MSG, registrationRequest.getEmail()));
        }

        boolean doesUserExist = userRepository.existsByEmail(registrationRequest.getEmail());
        if (doesUserExist) {
            throw new IllegalStateException(String.format(USER_ALREADY_EXISTS_MSG, registrationRequest.getEmail()));
        }

        Set<Role> roles = new HashSet<>();
        Role aRole = roleRepository.findByName(AppUserRole.DENTIST);
        roles.add(aRole);

        User newUser = new User(
                registrationRequest.getFirstname(),
                registrationRequest.getLastname(),
                registrationRequest.getEmail(),
                registrationRequest.getPhone(),
                registrationRequest.getPassword(),
                false,
                true,
                roles
        );

        String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);
    }

    public User updatePhone(Long userId, String phone) {
        User user = userRepository.findByUserId(userId).
                orElseThrow(() -> new UserNotFoundException(USER_ID_NOT_FOUND_MSG));
        user.setPhone(phone);
        userRepository.save(user);
        return user;
    }
}




















