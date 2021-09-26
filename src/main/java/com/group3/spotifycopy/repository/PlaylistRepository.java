package com.group3.spotifycopy.repository;

import com.group3.spotifycopy.models.Playlist;
import com.group3.spotifycopy.models.User;
import com.group3.spotifycopy.models.dto.PlaylistDTO;
import org.springframework.data.repository.CrudRepository;

public interface PlaylistRepository extends CrudRepository<PlaylistDTO, Integer> {
}
