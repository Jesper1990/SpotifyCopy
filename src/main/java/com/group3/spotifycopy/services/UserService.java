package com.group3.spotifycopy.services;

import com.group3.spotifycopy.dao.UserDAO;
import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.models.dto.UserDTO;
import com.group3.spotifycopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

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
            userToUpdate.setName(user.getName());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setPlaylists(user.getPlaylists());
        } else {
            userToUpdate.setId(id);
        }
        UserDTO updatedUser = userDAO.addUser(mapFromUser(userToUpdate));
        return mapToUser(updatedUser);
    }

    public UserDTO mapFromUser(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPlaylists());
    }

    public User mapToUser(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getName(), userDTO.getEmail(), userDTO.getPlaylists());
    }

}

