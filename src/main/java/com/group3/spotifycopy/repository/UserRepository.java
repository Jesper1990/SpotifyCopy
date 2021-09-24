package com.group3.spotifycopy.repository;

import com.group3.spotifycopy.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
