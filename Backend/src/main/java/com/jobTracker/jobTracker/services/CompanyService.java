package com.jobTracker.jobTracker.services;

import com.jobTracker.jobTracker.entities.Company;
import com.jobTracker.jobTracker.exceptions.ResourceNotFoundException;
import java.util.List;

public interface CompanyService {


     List<Company>getAllCompanies();

     List<Company> getCompaniesByUserId(Long userId);


     Company getCompanyById(Long id)throws ResourceNotFoundException;


     void deleteCompanyByid(Long id) throws ResourceNotFoundException;


     Company updateCompany( Long userId,Long companyId,Company updatedcompany)throws ResourceNotFoundException;


     Company addCompany(Long userId, Company company)throws ResourceNotFoundException;

}