package com.group3.spotifycopy.services;

import com.group3.spotifycopy.dao.PlaylistDAO;
import com.group3.spotifycopy.models.Playlist;
import com.group3.spotifycopy.models.dto.PlaylistDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class PlaylistService {

    private final PlaylistDAO playlistDAO;

    @Autowired
    public PlaylistService(PlaylistDAO playlistDAO) {
        this.playlistDAO = playlistDAO;
    }

    public List<Playlist> getAllPlaylists() {
        List<Playlist> playlists = new ArrayList<>();
        for (PlaylistDTO playlistDTO : playlistDAO.getAllPlaylists()) {
            Playlist playlist = mapToPlaylist(playlistDTO);
            playlists.add(playlist);
        }
        return playlists;
    }

    public Playlist updatePlaylist(Playlist playlist, Integer id) {
        Playlist playlistToUpdate = getPlaylistById(id);

        if (playlistToUpdate != null) {
            playlistToUpdate.setPlaylistName(playlist.getPlaylistName());
            playlistToUpdate.setSongIds(playlist.getSongIds());
        } else {
            playlistToUpdate.setId(id);
        }
        PlaylistDTO updatedPlaylist = playlistDAO.addPlaylist(mapFromPlaylist(playlistToUpdate));
        return mapToPlaylist(updatedPlaylist);
    }

    public Playlist addPlaylist(Playlist playlist) {
        PlaylistDTO newPlaylistDTO = playlistDAO.addPlaylist(mapFromPlaylist(playlist));
        return mapToPlaylist(newPlaylistDTO);
    }

    public Playlist getPlaylistById(Integer id) {
        if (playlistDAO.findPlaylistByID(id).isPresent()) {
            return mapToPlaylist(playlistDAO.findPlaylistByID(id).get());
        }
        return null;
    }

    public void deletePlaylist(Integer id) {
        playlistDAO.deletePlaylist(id);
    }

    public void deleteAllPlaylists() {
        playlistDAO.deleteAllPlaylists();
    }

    public PlaylistDTO mapFromPlaylist(Playlist playlist) {
        return new PlaylistDTO(playlist.getId(), playlist.getPlaylistName(), playlist.getSongIds());
    }

    public Playlist mapToPlaylist(PlaylistDTO playlistDTO) {
        return new Playlist(playlistDTO.getId(), playlistDTO.getPlaylistName(), playlistDTO.getSongIds());
    }

}
