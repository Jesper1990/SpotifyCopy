package com.group3.spotifycopy.dao;

import com.group3.spotifycopy.models.dto.PlaylistDTO;
import com.group3.spotifycopy.repository.PlaylistRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class PlaylistDAO {
    private final PlaylistRepository repository;

    public PlaylistDAO(PlaylistRepository repository) {
        this.repository = repository;
    }

    public PlaylistDTO addPlaylist(PlaylistDTO playlistDTO) {
        return repository.save(playlistDTO);
    }

    public Iterable<PlaylistDTO> getAllPlaylists() {
        return repository.findAll();
    }

    public Optional<PlaylistDTO> findPlaylistByID(Integer id) {
        return repository.findById(id);
    }

    public void deletePlaylist(Integer id) {
        repository.deleteById(id);
    }

    public void deleteAllPlaylists() {
        repository.deleteAll();
    }
}
