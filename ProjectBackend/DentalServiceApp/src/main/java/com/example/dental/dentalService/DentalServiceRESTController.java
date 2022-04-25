package com.example.dental.dentalService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/dental-service")
public class DentalServiceRESTController {

    private final DentalServiceService dentalServiceService;

    public DentalServiceRESTController(DentalServiceService dentalServiceService) {
        this.dentalServiceService = dentalServiceService;
    }

    @GetMapping("all")
    public ResponseEntity<List<DentalService>> getAll() {
        List<DentalService> dentalServices = dentalServiceService.findAll();
        return new ResponseEntity<>(dentalServices, HttpStatus.OK);
    }

    @GetMapping("get-one")
    public ResponseEntity<DentalService> getOne(@RequestParam String serviceId) {
        Long idL = Long.parseLong(serviceId);
        DentalService dentalServices = dentalServiceService.findOne(idL);
        return new ResponseEntity<>(dentalServices, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<DentalService> addDentalService(@RequestBody @Valid DentalService dentalService) {
        DentalService newDentalService = dentalServiceService.add(dentalService);
        return new ResponseEntity<>(newDentalService, HttpStatus.CREATED);
    }

    @PatchMapping("disable")
    public ResponseEntity<DentalService> disable(@RequestParam String id) {
        Long idL = Long.parseLong(id);
        dentalServiceService.disable(idL);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("enable")
    public ResponseEntity<DentalService> enable(@RequestParam String id) {
        Long idL = Long.parseLong(id);
        dentalServiceService.enable(idL);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("update-price")
    public ResponseEntity<DentalService> updatePrice(@RequestParam String id, @RequestParam String price) {
        Long idL = Long.parseLong(id);
        Double priceD = Double.parseDouble(price);
        dentalServiceService.updatePrice(idL, priceD);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
