// src/main/java/com/jobTracker/jobTracker/repositories/CompanyRepo.java
package com.jobTracker.jobTracker.repositories;

import com.jobTracker.jobTracker.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional; // Added import for Optional, as findById returns Optional

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long > {

    List<Company> findByUserId(Long userId);

    Company findByIdAndUserId(Long companyId,Long userId );



}