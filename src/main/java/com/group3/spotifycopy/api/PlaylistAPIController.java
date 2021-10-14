package com.group3.spotifycopy.api;

import com.group3.spotifycopy.models.Playlist;
import com.group3.spotifycopy.services.PlaylistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistAPIController {

    PlaylistService playlistService;

    public PlaylistAPIController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping()
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/{id}")
    public Playlist getPlaylistById(@PathVariable("id") Integer id) {
        return playlistService.getPlaylistById(id);
    }

    @PostMapping
    public Playlist addPlaylist(@RequestBody Playlist playlist) {
        return playlistService.addPlaylist(playlist);
    }

    @DeleteMapping("/{id}")
    public void deletePlaylist(@PathVariable("id") Integer id) {
        playlistService.deletePlaylist(id);
    }

    @PutMapping("/{id}")
    public Playlist updatePlaylist(@RequestBody Playlist newPlaylist,
                           @PathVariable("id") Integer id) {

        return playlistService.updatePlaylist(newPlaylist, id);
    }

    @PutMapping("/updateSongs/{id}")
    public Playlist updateSongs(@RequestBody Playlist newPlaylist,
                                   @PathVariable("id") Integer id) {

        return playlistService.updateSongs(newPlaylist, id);
    }
}


