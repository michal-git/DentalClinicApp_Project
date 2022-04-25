package com.example.dental.dentalService;

import com.example.dental.appointment.Appointment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class DentalService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @NotNull
    @Column(nullable = false)
    private double price;

    @NotNull
    @Column(nullable = false)
    private String description;

    private DentalServiceStatus status = DentalServiceStatus.ACTIVE;

    @JsonIgnore
    @OneToMany(mappedBy = "service")
    private Set<Appointment> appointments = new HashSet<>();

    public DentalService(double price, String description) {
        this.price = price;
        this.description = description;
    }
}
