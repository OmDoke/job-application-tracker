package com.jobTracker.jobTracker.controllers;

import com.jobTracker.jobTracker.entities.Company;
import com.jobTracker.jobTracker.entities.User;
import com.jobTracker.jobTracker.services.CompanyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/companies")
public class CompanyController {

    @Autowired
    private CompanyServiceImpl companyService;

    @GetMapping
    public ResponseEntity<List<Company>>getAllCompanies(){
        List<Company>companyList=companyService.getAllCompanies();
        return ResponseEntity.ok(companyList);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Company>> getCompanyByUserId(@PathVariable Long userId){
        List<Company> companyList= companyService.getCompaniesByUserId(userId);
                return ResponseEntity.ok(companyList);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Company>saveCompany(@PathVariable Long userId ,@RequestBody Company company ){
        System.out.println("----- saveCompany method reached! User ID: " + userId);
        Company company1= companyService.addCompany(userId,company);
       return ResponseEntity.ok(company1);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Company>deleteCompanyByName(@PathVariable Long companyId){
        Company company=companyService.getCompanyById(companyId);
        companyService.deleteCompanyByid(companyId);
        return ResponseEntity.ok(company);
    }

    @PutMapping("/user/{userId}/company/{companyId}")
    public ResponseEntity<Company>updateCompanyresult(@PathVariable Long userId, @PathVariable Long companyId, @RequestBody Company updatedCompany){

        try {
            // Pass both userId and companyId from the path to the service
            Company resultCompany = companyService.updateCompany(userId, companyId, updatedCompany);
            return ResponseEntity.ok(resultCompany);
        } catch (NoSuchElementException e) {
            // Handle if the company or user is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            // Handle if the company doesn't belong to the user
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Or include an error message
        } catch (Exception e) {
            // Catch any other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
