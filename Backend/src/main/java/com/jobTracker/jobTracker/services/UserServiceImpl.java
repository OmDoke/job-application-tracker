package com.jobTracker.jobTracker.services;


import com.jobTracker.jobTracker.entities.User;
import com.jobTracker.jobTracker.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        List<User>Userlist=userRepo.findAll();
        return Userlist;
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    @Override
    public User getUserByemail(String emailId) {
        Optional<User>user=userRepo.findByEmailId(emailId);
        return user.orElse(null);
    }

    @Override
    public void deleteUserById(Long id) {
         userRepo.deleteById(id);
    }

}
