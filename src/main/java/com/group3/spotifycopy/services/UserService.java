package com.group3.spotifycopy.services;

import com.group3.spotifycopy.configs.MyUserDetailsService;
import com.group3.spotifycopy.dao.UserDAO;
import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.models.dto.UserDTO;
import com.group3.spotifycopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

   /* @Autowired
    private UserRepository userRepo;*/

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return mapToUser(userDAO.findByUsername(username));
    }

    /*public User registerUser(User user) {
        return myUserDetailsService.addUser(user.getUsername(), user.getPassword());
    }*/

    public User addUser(User user) {
        UserDTO newUserDTO = userDAO.addUser(mapFromUser(user));
        return mapToUser(newUserDTO);
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        for (UserDTO userDTO : userDAO.getAllUsers()) {
            User user = mapToUser(userDTO);
            users.add(user);
        }
        return users;
    }

    public User getUserById(Integer id) {
        if (userDAO.findUserByID(id).isPresent()) {
            return mapToUser(userDAO.findUserByID(id).get());
        }
        return null;
    }

    public void deleteUser(Integer id) {
        userDAO.deleteUser(id);
    }

    public void deleteAllUsers() {
        userDAO.deleteAllUsers();
    }

    public User updateUser(User user, Integer id) {
        User userToUpdate = getUserById(id);

        if (userToUpdate != null) {
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setPassword(user.getPassword());
        } else {
            userToUpdate.setId(id);
        }
        UserDTO updatedUser = userDAO.addUser(mapFromUser(userToUpdate));
        return mapToUser(updatedUser);
    }

    public UserDTO mapFromUser(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword());
    }

    public User mapToUser(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getUsername(), userDTO.getPassword());
    }

    public User findByUsername(String username) {
            return mapToUser(userDAO.findByUsername(username));
    }

}

