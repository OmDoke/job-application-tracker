package com.jobTracker.jobTracker.controllers;

import com.jobTracker.jobTracker.entities.User;
import com.jobTracker.jobTracker.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @GetMapping
    ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    ResponseEntity<User> saveUser(@RequestBody User user) {
        User user1 = userService.saveUser(user);
        return ResponseEntity.ok(user1);
    }

    @GetMapping("/{userId}")
    ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{emailId}")
    ResponseEntity<User> getUserById(@PathVariable String emailId) {
        User user = userService.getUserByemail(emailId);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{userId}")
    ResponseEntity<User> deleteUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        userService.deleteUserById(userId);
        return ResponseEntity.ok(user);
    }

}


