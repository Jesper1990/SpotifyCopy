package com.group3.spotifycopy.repository;

import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.models.dto.UserDTO;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserDTO, Integer> {

    UserDTO findByUsername(String username);
}
