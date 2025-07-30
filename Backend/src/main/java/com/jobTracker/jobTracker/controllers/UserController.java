package com.jobTracker.jobTracker.controllers;

import com.jobTracker.jobTracker.entities.User;
import com.jobTracker.jobTracker.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
     try{
         User user1 = userService.saveUser(user);
         return ResponseEntity.ok(user1);
     }catch (Exception e){
         System.out.println("ERROR " + e.getMessage());
         e.printStackTrace();
         return ResponseEntity.internalServerError().build();
     }
    }

    @GetMapping("/{userId}")
    ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{emailId}")
    ResponseEntity<User> getUserByEmailId(@PathVariable String emailId) {
        User user = userService.getUserByemail(emailId);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{userId}")
    ResponseEntity<User> deleteUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        userService.deleteUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody User user) {
        String emailId = user.getEmailId();
        String password = user.getPassword();

        try {
            User existingUser = userService.getUserByemail(emailId);
            System.out.println("ERROR " + existingUser);

            if (existingUser != null && existingUser.getPassword().equals(password)) {
                return ResponseEntity.ok()
                        .body(Map.of(
                                "success", true,
                                "user", existingUser
                        ));
            }
            return ResponseEntity.ok()
                    .body(Map.of(
                            "success", false,
                            "message", "Invalid credentials"
                    ));

        } catch (Exception e) {
            System.out.println("ERROR " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.ok()
                    .body(Map.of(
                            "success", false,
                            "message", "Server error occurred"
                    ));
        }
    }

}


