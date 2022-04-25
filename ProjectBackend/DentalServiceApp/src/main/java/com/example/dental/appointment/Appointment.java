package com.example.dental.appointment;

import com.example.dental.dentalService.DentalService;
import com.example.dental.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name="appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appId;
    private AppointmentStatus status;
    private String clientDescription;
    private String dentistDescription;
    private LocalDateTime appointmentDate;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient;

    @ManyToOne
    @JoinColumn(name = "dentist_id")
    private User dentist;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private DentalService service;
}
