package com.example.dental.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    Appointment findByAppId(Long appId);
    List<Appointment> findAllByDentist_UserId(Long userId);

    @Query("SELECT a FROM Appointment a WHERE a.patient.email = ?1 OR a.dentist.email = ?1")
    List<Appointment> findAllByCurrentUserEmail(String email);
}
