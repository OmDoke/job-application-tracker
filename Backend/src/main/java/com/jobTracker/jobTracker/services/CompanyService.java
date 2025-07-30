// src/main/java/com/jobTracker/jobTracker/services/CompanyService.java
package com.jobTracker.jobTracker.services;

import com.jobTracker.jobTracker.entities.Company;
import com.jobTracker.jobTracker.exceptions.ResourceNotFoundException;
import java.util.List;

public interface CompanyService { // Removed @Service from interface


     List<Company>getAllCompanies();

     List<Company> getCompaniesByUserId(Long userId);

     List<Company>findByUserId(Long userId);

     Company getCompanyById(Long id)throws ResourceNotFoundException;

     Company getCompanyByName(String company)throws ResourceNotFoundException;

     void deleteCompanyByid(Long id) throws ResourceNotFoundException;

     void deleteCompanyByname(String company) throws ResourceNotFoundException;

     Company updateCompany( Long userId,Long companyId,Company updatedcompany)throws ResourceNotFoundException;


     Company getCompanyByIdAndUserId(Long companyId,Long userId) throws ResourceNotFoundException;

     void deleteCompanyByCompanyIdAndUserId(Long companyId,Long userId) throws ResourceNotFoundException;

     // Added back these methods as they are crucial for the application flow
     Company addCompany(Long userId, Company company)throws ResourceNotFoundException;

}