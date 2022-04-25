package com.example.dental.appointment;

import com.example.dental.dentalService.DentalServiceRepository;
import com.example.dental.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DentalServiceRepository dentalServiceRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository, DentalServiceRepository dentalServiceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.dentalServiceRepository = dentalServiceRepository;
    }

    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> findAllAppointmentsByCurrentUserId(String email) {
        return appointmentRepository.findAllByCurrentUserEmail(email);
    }

    public List<Appointment> findAllAppointmentsByDentistId(Long dentistId) {
        return appointmentRepository.findAllByDentist_UserId(dentistId);
    }


    public Appointment create(AppointmentRequest request, String userEmail) {
        Appointment newAppointment = Appointment.builder()
                .status(AppointmentStatus.PENDING)
                .clientDescription(request.getClientDescription())
                .appointmentDate(request.getAppointmentDate())
                .patient(userRepository.getByEmail(userEmail))
                .dentist(userRepository.findByUserId(request.getUserId()).get())
                .service(dentalServiceRepository.findByServiceId(request.getServiceId()))
                .build();
        appointmentRepository.save(newAppointment);
        return newAppointment;
    }

    public Appointment createByDentist(AppointmentRequest request, String dentistEmail) {
        Appointment newAppointment = Appointment.builder()
                .status(AppointmentStatus.PENDING)
                .clientDescription(request.getClientDescription())
                .appointmentDate(request.getAppointmentDate())
                .patient(userRepository.findByUserId(request.getUserId()).get())
                .dentist(userRepository.getByEmail(dentistEmail))
                .service(dentalServiceRepository.findByServiceId(request.getServiceId()))
                .build();
        appointmentRepository.save(newAppointment);
        return newAppointment;
    }

    public void cancel(Long id) {
        Appointment appointment = appointmentRepository.findByAppId(id);
        appointment.setStatus(AppointmentStatus.CANCELED);
        appointmentRepository.save(appointment);
    }

    public void postpone(Long id, LocalDateTime appointmentDate) {
        Appointment appointment = appointmentRepository.findByAppId(id);
        appointment.setAppointmentDate(appointmentDate);
        appointmentRepository.save(appointment);
    }

    public void setDone(Long id) {
        Appointment appointment = appointmentRepository.findByAppId(id);
        appointment.setStatus(AppointmentStatus.DONE);
        appointmentRepository.save(appointment);
    }

    public void addDescription(Long id, String dentistDescription) {
        Appointment appointment = appointmentRepository.findByAppId(id);
        appointment.setDentistDescription(dentistDescription);
        appointmentRepository.save(appointment);
    }
}
