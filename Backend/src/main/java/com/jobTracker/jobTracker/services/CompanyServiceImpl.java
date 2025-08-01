package com.jobTracker.jobTracker.services;

import com.jobTracker.jobTracker.entities.Company;
import com.jobTracker.jobTracker.entities.User;
import com.jobTracker.jobTracker.exceptions.ResourceNotFoundException;
import com.jobTracker.jobTracker.repositories.CompanyRepo;
import com.jobTracker.jobTracker.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepo companyRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Company addCompany(Long userId, Company company) throws ResourceNotFoundException {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        company.setUser(user);


        return companyRepo.save(company);
    }


    @Override
    public List<Company> getAllCompanies() {
        return companyRepo.findAll();
    }

    @Override
    public List<Company> getCompaniesByUserId(Long userId) {
         List<Company> companyList= companyRepo.findByUserId(userId);
         return companyList;
    }


    @Override
    public Company getCompanyById(Long id) throws ResourceNotFoundException {

        return companyRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + id));
    }


    @Override
    public void deleteCompanyByid(Long id) throws ResourceNotFoundException {

        if (!companyRepo.existsById(id)) {
            throw new ResourceNotFoundException("Company not found with id: " + id);
        }
        companyRepo.deleteById(id);
    }


    @Override
    public Company updateCompany(Long userId, Long companyId, Company updatedCompany) throws ResourceNotFoundException {
        Company existingCompany = companyRepo.findByIdAndUserId(companyId, userId);

        if (existingCompany == null) {
            throw new ResourceNotFoundException("Company not found with id " + companyId + " for user " + userId);
        }

        // Update fields
        existingCompany.setCompany(updatedCompany.getCompany());
        existingCompany.setPosition(updatedCompany.getPosition());
        existingCompany.setStatus(updatedCompany.getStatus());
        existingCompany.setDate(updatedCompany.getDate());

        return companyRepo.save(existingCompany);
    }

}