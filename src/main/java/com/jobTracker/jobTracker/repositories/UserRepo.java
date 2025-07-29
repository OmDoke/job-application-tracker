package com.jobTracker.jobTracker.repositories;

import com.jobTracker.jobTracker.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    User findByEmailId(String emailId);


}
