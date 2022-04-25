package com.example.dental.appointment;

import com.example.dental.dentalService.DentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/appointments")
public class AppointmentRESTController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentRESTController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.findAllAppointments();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("my-appointments")
    public ResponseEntity<List<Appointment>> getAllPatientAppointments(Principal user) {
        List<Appointment> appointments = appointmentService.findAllAppointmentsByCurrentUserId(user.getName());
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("dentist-appointments")
    public ResponseEntity<List<Appointment>> getAllDentistAppointments(@RequestParam Long dentistId) {
        List<Appointment> appointments = appointmentService.findAllAppointmentsByDentistId(dentistId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<Appointment> createAppointment(@RequestBody @Valid AppointmentRequest appointmentRequest,
                                                         Principal user) {
        Appointment newAppointment = appointmentService.create(appointmentRequest, user.getName());
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    @PostMapping("dentist/create")
    public ResponseEntity<Appointment> createAppointmentByDentist(@RequestBody @Valid AppointmentRequest appointmentRequest,
                                                                  Principal user) {
        Appointment newAppointment = appointmentService.createByDentist(appointmentRequest, user.getName());
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    @PatchMapping("cancel")
    public ResponseEntity<DentalService> cancel(@RequestParam Long id) {
        appointmentService.cancel(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("postpone")
    public ResponseEntity<DentalService> postpone(@RequestParam Long id, @RequestParam LocalDateTime appointmentDate) {
        appointmentService.postpone(id, appointmentDate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("done")
    public ResponseEntity<DentalService> setDone(@RequestParam Long id) {
        appointmentService.setDone(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("add-description")
    public ResponseEntity<DentalService> addDescription(@RequestParam Long id, @RequestParam String dentistDescription) {
        appointmentService.addDescription(id, dentistDescription);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
