package com.group3.spotifycopy.services;

import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(c -> users.add(c)); //users::add
        return users;
    }

    public User addUser(User user) {

        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {

        userRepository.deleteById(id);
    }

    public User updateUser(Integer id, User user) {

        return userRepository.save(user);
    }

    public Optional<User> getUser(Integer id) {

        return userRepository.findById(id);
    }
}

