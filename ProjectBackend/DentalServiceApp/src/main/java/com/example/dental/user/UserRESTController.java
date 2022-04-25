package com.example.dental.user;

import com.example.dental.message.response.ResponseMessage;
import com.example.dental.registration.RegistrationRequest;
import com.example.dental.role.AppUserRole;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/users")
public class UserRESTController {

    private final UserService userService;

    public UserRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("all-patients")
    public ResponseEntity<List<User>> findAllPatients() {
        List<User> patients = userService.findAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("get-one")
    public ResponseEntity<User> findPatients(@RequestParam Long userId) {
        User patient = userService.findPatient(userId);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("my-profile")
    public ResponseEntity<User> getMyProfile(Principal user) {
        User currentUser = userService.findUserByEmail(user.getName());
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    @GetMapping("all-dentists")
    public ResponseEntity<List<User>> findAllDentists() {
        List<User> dentists = userService.findAllDentists();
        return new ResponseEntity<>(dentists, HttpStatus.OK);
    }

    @GetMapping("all-admins")
    public ResponseEntity<List<User>> findAllAdmins() {
        List<User> admins = userService.findAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PutMapping("add-role")
    public ResponseEntity<User> addRole(@RequestParam Long userId, @RequestParam AppUserRole role) {
        User user = userService.addRole(userId, role);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("remove-role")
    public ResponseEntity<User> removeRole(@RequestParam Long userId, @RequestParam AppUserRole role) {
        User user = userService.removeRole(userId, role);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("set-blocked")
    public ResponseEntity<User> setBlocked(@RequestParam Long userId, @RequestParam Boolean blocked) {
        User user = userService.setBlocked(userId, blocked);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("add-admin")
    public ResponseEntity<?> addAdmin(@RequestBody @Valid RegistrationRequest registrationRequest) {
        userService.registerAdmin(registrationRequest);
        return new ResponseEntity<>(new ResponseMessage("New User added successfully."), HttpStatus.OK);
    }

    @PostMapping("add-dentist")
    public ResponseEntity<?> addDentist(@RequestBody @Valid RegistrationRequest registrationRequest) {
        userService.registerDentist(registrationRequest);
        return new ResponseEntity<>(new ResponseMessage("New User added successfully."), HttpStatus.OK);
    }

    @PutMapping("update-phone")
    public ResponseEntity<User> updatePhone(@RequestParam Long userId, @RequestParam String phone) {
        User user = userService.updatePhone(userId, phone);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
