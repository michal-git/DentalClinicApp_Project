package com.example.dental.appointment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class AppointmentRequest {

    private String clientDescription;
    private LocalDateTime appointmentDate;
    private Long userId;
    private Long serviceId;
}
