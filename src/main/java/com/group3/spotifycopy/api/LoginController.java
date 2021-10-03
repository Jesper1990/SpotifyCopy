package com.group3.spotifycopy.api;

import com.group3.spotifycopy.configs.MyUserDetailsService;
import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private UserService userService;

    //testfunction for react connectivity
    @GetMapping("/hello")
    public String sayHello(){
        return "hello springboot";
    }

    @GetMapping("/whoami")
    public User whoAmI() {
        return userService.findCurrentUser();
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.addUser(user);
    }


}
