package com.jobTracker.jobTracker.services;

import com.jobTracker.jobTracker.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    User saveUser (User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByemail(String emailId);

    void deleteUserById(Long id);

    //Optional<User> authenticateUser(String email, String password)





}
