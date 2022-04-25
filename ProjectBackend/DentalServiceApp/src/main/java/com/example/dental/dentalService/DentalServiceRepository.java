package com.example.dental.dentalService;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DentalServiceRepository extends JpaRepository<DentalService,Long> {
    DentalService findByServiceId(Long id);
}
