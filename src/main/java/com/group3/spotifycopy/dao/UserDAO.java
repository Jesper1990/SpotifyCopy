package com.group3.spotifycopy.dao;

import com.group3.spotifycopy.models.dto.UserDTO;
import com.group3.spotifycopy.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDAO {
    private final UserRepository repository;

    public UserDAO(UserRepository repository) {
        this.repository = repository;
    }

    public UserDTO addUser(UserDTO userDTO) {
        return repository.save(userDTO);
    }

    public Iterable<UserDTO> getAllUsers() {
        return repository.findAll();
    }

    public Optional<UserDTO> findUserByID(Integer id) {
        return repository.findById(id);
    }

    public void deleteUser(Integer id) {
        repository.deleteById(id);
    }

    public void deleteAllUsers() {
        repository.deleteAll();
    }
}
