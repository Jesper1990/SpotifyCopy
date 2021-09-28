package com.group3.spotifycopy.api;

import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class APIController {

    @Autowired
    private UserService userService;

    @GetMapping("/api")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/api/{id}")
    public User getUserById(@PathVariable("id") Integer id){
        return userService.getUserById(id);
    }

    @PostMapping("/api")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PostMapping("/api/{id}")
    public void deleteUser(@PathVariable("id") Integer id){
        userService.deleteUser(id);
    }

    @PutMapping("/api/{id}")
    public User updateUser(@PathVariable("id") Integer id, @RequestBody User user){
        return userService.updateUser(user, id);
    }
}
