package com.group3.spotifycopy.repository;

import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.models.dto.UserDTO;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDTO, Integer> {
}
