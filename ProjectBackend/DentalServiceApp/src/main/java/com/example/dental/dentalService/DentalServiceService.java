package com.example.dental.dentalService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DentalServiceService {

    private final DentalServiceRepository dentalServiceRepository;

    public DentalServiceService(DentalServiceRepository dentalServiceRepository) {
        this.dentalServiceRepository = dentalServiceRepository;
    }

    public List<DentalService> findAll() {
        return dentalServiceRepository.findAll();
    }

    public DentalService findOne(Long serviceId) {
        return dentalServiceRepository.findByServiceId(serviceId);
    }

    public DentalService add(DentalService dentalService) {
        DentalService newDentalService = new DentalService(
                dentalService.getPrice(),
                dentalService.getDescription());
         dentalServiceRepository.save(newDentalService);
        return newDentalService;
    }

    public void disable(Long id) {
        DentalService updatedDentalService = dentalServiceRepository.findByServiceId(id);
        updatedDentalService.setStatus(DentalServiceStatus.NOT_ACTIVE);
        dentalServiceRepository.save(updatedDentalService);
    }

    public void enable(Long id) {
        DentalService updatedDentalService = dentalServiceRepository.findByServiceId(id);
        updatedDentalService.setStatus(DentalServiceStatus.ACTIVE);
        dentalServiceRepository.save(updatedDentalService);
    }

    public void updatePrice(Long id, Double price) {
        DentalService updatedDentalService = dentalServiceRepository.findByServiceId(id);
        updatedDentalService.setPrice(price);
        dentalServiceRepository.save(updatedDentalService);
    }
}
