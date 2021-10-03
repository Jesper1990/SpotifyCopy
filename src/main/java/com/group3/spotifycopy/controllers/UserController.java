package com.group3.spotifycopy.controllers;

import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/adduser")
    public String addUser(@ModelAttribute User user){
        userService.addUser(user);
        return "index";
    }

    @RequestMapping("/test")
    public String showIndex(Model model){
        List <User> users = userService.getAllUsers();
        model.addAttribute("users", users);

        return "index";
    }

}

